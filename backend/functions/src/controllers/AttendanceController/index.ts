import { Request, Response } from "express";
import { supabase } from "../../data-access";
import { appendRow } from "../../services/googleSheets";

const YES = "YES";
const NO = "NO";

export const createAttendance = async (req: Request, res: Response) => {
  try {
    const {
      attending,
      adults,
      children,
      adultNames = [],
      childNames = [],
      adultAllergies = [],
      adultDiet = [],
      childAllergies = [],
      childDiet = [],
      babyCart,
      songs,
      declinedName,
    } = req.body;

    // ----------------------------
    // 1. VALIDATION (FIRST THING)
    // ----------------------------
    if (attending === null || attending === undefined) {
      return res.status(400).send("Missing attending");
    }

    if (!attending && !declinedName?.trim()) {
      return res.status(400).send("Name required for declined RSVP");
    }

    if (attending && (!adultNames || adultNames.length === 0)) {
      return res.status(400).send("At least one adult required");
    }

    // ----------------------------
    // 2. INSERT RSVP (SUPABASE)
    // ----------------------------
    const { data: rsvp, error: rsvpError } = await supabase
      .from("rsvps")
      .insert([
        {
          attending,
          adults: attending ? adults : 0,
          children: attending ? children : 0,
          baby_cart: attending ? babyCart ?? null : null,
          songs: attending ? songs || null : null,
        },
      ])
      .select()
      .single();

    if (rsvpError || !rsvp) {
      console.error("RSVP ERROR:", rsvpError);
      return res.sendStatus(500);
    }

    const baseMeta = [
      attending ? YES : NO,
      attending ? adults : 0,
      attending ? children : 0,
      attending ? songs || "" : "",
      attending ? (babyCart ? YES : NO) : "",
    ];

    // ----------------------------
    // 3. DECLINED FLOW
    // ----------------------------
    if (!attending) {
      await supabase.from("guests").insert([
        {
          name: declinedName,
          type: "declined",
          rsvp_id: rsvp.id,
        },
      ]);

      await appendRow([
        NO,
        0,
        0,
        "",
        "",
        declinedName,
        "",
        "",
        "declined",
      ]);

      return res.status(200).json({ success: true });
    }

    // ----------------------------
    // 4. ADULTS
    // ----------------------------
    const adultRows = adultNames.map((name: string, i: number) => ({
      name,
      type: "adult",
      allergy: adultAllergies?.[i] || null,
      diet: adultDiet?.[i] || null,
      rsvp_id: rsvp.id,
    }));

    if (adultRows.length > 0) {
      const { error } = await supabase.from("guests").insert(adultRows);
      if (error) console.error("Adult insert error:", error);
    }

    for (let i = 0; i < adultNames.length; i++) {
      await appendRow([
        ...baseMeta,
        adultNames[i] || "",
        adultAllergies?.[i] || "",
        adultDiet?.[i] || "",
        "adult",
      ]);
    }

    // ----------------------------
    // 5. CHILDREN
    // ----------------------------
    if (children > 0) {
      const childRows = Array(children)
        .fill(0)
        .map((_, i) => ({
          name: childNames?.[i] || "",
          type: "child",
          allergy: childAllergies?.[i] || null,
          diet: childDiet?.[i] || null,
          rsvp_id: rsvp.id,
        }));

      const { error } = await supabase.from("guests").insert(childRows);
      if (error) console.error("Child insert error:", error);

      for (let i = 0; i < children; i++) {
        await appendRow([
          ...baseMeta,
          "",
          childAllergies?.[i] || "",
          childDiet?.[i] || "",
          "child",
        ]);
      }
    }

    return res.status(200).json({ success: true });
  } catch (err) {
    console.error("CREATE ATTENDANCE ERROR:", err);
    return res.status(500).send("Internal server error");
  }
};