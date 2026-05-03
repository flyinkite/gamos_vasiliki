import { Request, Response } from "express";
import { supabase } from "../../data-access";

export const createAttendance = async (req: Request, res: Response) => {
  const {
    attending,
    adults,
    children,
    adultNames,
    childNames,
    adultAllergies,
    adultDiet,
    childAllergies,
    childDiet,
    babyCart,
    songs,
    declinedName,
  } = req.body;

  // 🔐 Validation
  if (attending === null || attending === undefined) {
    return res.status(400).send("Missing attending");
  }

  if (!attending && !declinedName?.trim()) {
    return res.status(400).send("Name required for declined RSVP");
  }

  if (attending && (!adultNames || adultNames.length === 0)) {
    return res.status(400).send("At least one adult required");
  }

  try {
    // 1️⃣ Insert RSVP
    const { data: rsvp, error } = await supabase
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

    if (error) {
      console.error("RSVP ERROR:", error);
      return res.sendStatus(500);
    }

    // 2️⃣ If NOT attending → insert ONE guest
    if (!attending) {
      const { error: guestError } = await supabase.from("guests").insert([
        {
          name: declinedName,
          type: "declined",
          rsvp_id: rsvp.id,
        },
      ]);

      if (guestError) console.error(guestError);

      return res.sendStatus(200);
    }

    // 3️⃣ Adults
    const adultRows = adultNames.map((name: string, i: number) => ({
      name,
      type: "adult",
      allergy: adultAllergies?.[i] || null,
      diet: adultDiet?.[i] || null,
      rsvp_id: rsvp.id,
    }));

    if (adultRows.length > 0) {
      const { error } = await supabase.from("guests").insert(adultRows);
      if (error) console.error(error);
    }

    // 4️⃣ Children
    if (children > 0) {
      const childRows = Array(children)
        .fill(0)
        .map((_, i) => ({
          name: childNames?.[i] || `Child ${i + 1}`,
          type: "child",
          allergy: childAllergies?.[i] || null,
          diet: childDiet?.[i] || null,
          rsvp_id: rsvp.id,
        }));

      const { error } = await supabase.from("guests").insert(childRows);
      if (error) console.error(error);
    }

    return res.sendStatus(200);
  } catch (e) {
    console.error(e);
    return res.sendStatus(500);
  }
};