import { Request, Response } from "express";
import { supabase } from "../../data-access";

export const createAttendance = async (req: Request, res: Response) => {
  const {
    attending,
    name,
    email,
    adults,
    children,
    guests,
    allergy,
    diet,
    songs,
  } = req.body;

  // ✅ Validation
  if (attending === null || attending === undefined) {
    return res.status(400).send("Missing attending field");
  }

  if (!name || !email) {
    return res.status(400).send("Name and email are required");
  }

  // ✅ Clean guests
  const cleanGuests =
    guests && Array.isArray(guests)
      ? [...new Set(guests.map((g: string) => g.trim()).filter(Boolean))]
      : [];

  // ✅ Handle "not attending"
  const finalAdults = attending ? adults : 0;
  const finalChildren = attending ? children : 0;
  const finalGuests = attending ? cleanGuests : [];

  try {
    // 1. Insert RSVP
    const { data: rsvp, error } = await supabase
      .from("rsvps")
      .insert([
        {
          attending,
          name,
          email,
          adults: finalAdults,
          children: finalChildren,
          allergy: allergy || null,
          diet: diet || null,
          songs: songs || null,
        },
      ])
      .select()
      .single();

    if (error) {
      console.error(error);
      return res.sendStatus(500);
    }

    // 2. Insert guests
    if (finalGuests.length > 0) {
      const guestRows = finalGuests.map((g: string) => ({
        name: g,
        rsvp_id: rsvp.id,
      }));

      const { error: guestError } = await supabase
        .from("guests")
        .insert(guestRows);

      if (guestError) {
        console.error(guestError);
      }
    }

    return res.sendStatus(200);
  } catch (e) {
    console.error(e);
    return res.sendStatus(500);
  }
};