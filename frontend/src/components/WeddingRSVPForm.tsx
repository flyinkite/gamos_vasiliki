import WeddingRSVPFormStyle from "./WeddingRSVPForm.module.css";
import { useState } from "react";
import { FaCheck } from "react-icons/fa";

export const WeddingRSVPForm = () => {
  const [attending, setAttending] = useState<boolean | null>(null);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");

  const [adults, setAdults] = useState(0);
  const [children, setChildren] = useState(0);

  const [guestNames, setGuestNames] = useState<string[]>([]);

  const [hasAllergy, setHasAllergy] = useState(false);
  const [allergyDetails, setAllergyDetails] = useState("");

  const [diet, setDiet] = useState(""); // vegetarian / vegan
  const [songs, setSongs] = useState("");

  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  // Handle guest names dynamically
  const updateGuestNames = (total: number) => {
    const newArray = Array(total).fill("").map((_, i) => guestNames[i] || "");
    setGuestNames(newArray);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (attending === null) {
      return alert("Παρακαλώ επιλέξτε αν θα παρευρεθείτε");
    }

    setLoading(true);

    try {
      const res = await fetch(`${import.meta.env.VITE_API_URL}/api/attendances`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          attending,
          name,
          email,
          adults,
          children,
          guests: guestNames,
          allergy: hasAllergy ? allergyDetails : null,
          diet,
          songs,
        }),
      });

      if (!res.ok) throw new Error();

      setSubmitted(true);
    } catch (err) {
      alert("Σφάλμα κατά την υποβολή");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={WeddingRSVPFormStyle.main}>
      <div className={WeddingRSVPFormStyle.outerWrapper}>
        <h1 className={WeddingRSVPFormStyle.h1}>RSVP</h1>
        <p className={WeddingRSVPFormStyle.p}>
          Παρακαλούμε απαντήστε έως 05/07/24
        </p>
      </div>

      {submitted ? (
        <p>
          <FaCheck color="green" /> Ευχαριστούμε! Η απάντησή σας καταχωρήθηκε
        </p>
      ) : (
        <form className={WeddingRSVPFormStyle.form} onSubmit={handleSubmit}>
          
          {/* Attendance */}
          <label>Θα παρευρεθείτε;</label>
          <label>
            <input type="radio" onChange={() => setAttending(true)} /> Ναι
          </label>
          <label>
            <input type="radio" onChange={() => setAttending(false)} /> Όχι
          </label>

          {/* Name */}
          <label>Ονοματεπώνυμο</label>
          <input
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Πλήρες όνομα"
          />

          {/* Email */}
          <label>Email</label>
          <input
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="example@email.com"
          />

          {/* Guests */}
          <label>Αριθμός ενηλίκων</label>
          <input
            type="number"
            value={adults}
            onChange={(e) => {
              const val = Number(e.target.value);
              setAdults(val);
              updateGuestNames(val + children);
            }}
          />

          <label>Αριθμός παιδιών</label>
          <input
            type="number"
            value={children}
            onChange={(e) => {
              const val = Number(e.target.value);
              setChildren(val);
              updateGuestNames(adults + val);
            }}
          />

          <label>Ονόματα καλεσμένων</label>
          {guestNames.map((g, i) => (
            <input
              key={i}
              value={g}
              placeholder={`Όνομα #${i + 1}`}
              onChange={(e) => {
                const newNames = [...guestNames];
                newNames[i] = e.target.value;
                setGuestNames(newNames);
              }}
            />
          ))}

          {/* Allergies */}
          <label>Έχετε κάποια αλλεργία;</label>
          <label>
            <input
              type="checkbox"
              onChange={(e) => setHasAllergy(e.target.checked)}
            />{" "}
            Ναι
          </label>

          {hasAllergy && (
            <input
              placeholder="Παρακαλώ αναφέρετε"
              value={allergyDetails}
              onChange={(e) => setAllergyDetails(e.target.value)}
            />
          )}

          {/* Diet */}
          <label>Διατροφικές προτιμήσεις</label>
          <select onChange={(e) => setDiet(e.target.value)}>
            <option value="">Καμία</option>
            <option value="vegetarian">Χορτοφάγος</option>
            <option value="vegan">Vegan</option>
          </select>

          {/* Songs */}
          <label>Προτάσεις τραγουδιών</label>
          <input
            placeholder="Προτείνετε τραγούδια για το γλέντι"
            value={songs}
            onChange={(e) => setSongs(e.target.value)}
          />

          <button type="submit" disabled={loading}>
            {loading ? "Αποστολή..." : "Υποβολή"}
          </button>
        </form>
      )}
    </div>
  );
};