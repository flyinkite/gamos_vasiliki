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
  } = req.body;

  // ✅ Validation
  if (attending === null || attending === undefined) {
    return res.status(400).send("Missing attending field");
  }

  if (attending && (!adultNames || adultNames.length === 0)) {
    return res.status(400).send("At least one adult required");
  }

  try {
    // 1. Insert RSVP (main record)
    const { data: rsvp, error } = await supabase
      .from("rsvps")
      .insert([
        {
          attending,
          adults: attending ? adults : 0,
          children: attending ? children : 0,
          baby_cart: babyCart ?? null,
          songs: songs || null,
        },
      ])
      .select()
      .single();

    if (error) {
      console.error(error);
      return res.sendStatus(500);
    }

    // 2. Insert adults
    if (attending && adultNames?.length > 0) {
      const adultRows = adultNames.map((name: string, i: number) => ({
        name,
        type: "adult",
        allergy: adultAllergies?.[i] || null,
        diet: adultDiet?.[i] || null,
        rsvp_id: rsvp.id,
      }));

      const { error: adultError } = await supabase
        .from("guests")
        .insert(adultRows);

      if (adultError) console.error(adultError);
    }

    // 3. Insert children
    if (attending && children > 0) {
      const childRows = Array(children).fill(0).map((_, i) => ({
        name: childNames?.[i] || `Child ${i + 1}`,
        type: "child",
        allergy: childAllergies?.[i] || null,
        diet: childDiet?.[i] || null,
        rsvp_id: rsvp.id,
      }));

      const { error: childError } = await supabase
        .from("guests")
        .insert(childRows);

      if (childError) console.error(childError);
    }

    return res.sendStatus(200);
  } catch (e) {
    console.error(e);
    return res.sendStatus(500);
  }
};