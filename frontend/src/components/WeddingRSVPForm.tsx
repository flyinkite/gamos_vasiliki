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

  const [hasAllergy, setHasAllergy] = useState<boolean | null>(null);
  const [allergyDetails, setAllergyDetails] = useState("");

  const [diet, setDiet] = useState("");
  const [songs, setSongs] = useState("");

  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const updateGuestNames = (total: number) => {
    const newArray = Array(total)
      .fill("")
      .map((_, i) => guestNames[i] || "");
    setGuestNames(newArray);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (attending === null) {
      return alert("Παρακαλώ επιλέξτε αν θα παρευρεθείτε");
    }

    if (!name.trim()) {
      return alert("Παρακαλώ συμπληρώστε το όνομα");
    }

    if (!email.trim()) {
      return alert("Παρακαλώ συμπληρώστε το email");
    }

    if (hasAllergy === true && !allergyDetails.trim()) {
      return alert("Παρακαλώ συμπληρώστε την αλλεργία");
    }

    setLoading(true);

    try {
      const res = await fetch(
        `${import.meta.env.VITE_API_URL}/api/attendances`,
        {
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
        }
      );

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
        <h1 className={WeddingRSVPFormStyle.h1}>
          Φόρμα
        </h1>
        <p className={WeddingRSVPFormStyle.p}>
          Παρακαλούμε απαντήστε έως 10/07/26
        </p>
      </div>

      {submitted ? (
        <p className={WeddingRSVPFormStyle.createdAt}>
          <FaCheck /> Ευχαριστούμε! Η απάντησή σας καταχωρήθηκε
        </p>
      ) : (
        <form className={WeddingRSVPFormStyle.form} onSubmit={handleSubmit}>
          
          {/* Attendance */}
          <div className={WeddingRSVPFormStyle.section}>
            <label className={WeddingRSVPFormStyle.label}>
              Θα παρευρεθείτε;
            </label>

            <div style={{ display: "flex", gap: "10px" }}>
              <label className={WeddingRSVPFormStyle.customRadio}>
                <input
                  type="radio"
                  name="attending"
                  onChange={() => setAttending(true)}
                />
                <div className={WeddingRSVPFormStyle.radioButton}>Ναι</div>
              </label>

              <label className={WeddingRSVPFormStyle.customRadio}>
                <input
                  type="radio"
                  name="attending"
                  onChange={() => setAttending(false)}
                />
                <div className={WeddingRSVPFormStyle.radioButton}>Όχι</div>
              </label>
            </div>
          </div>

          {/* Name */}
          <div className={WeddingRSVPFormStyle.section}>
            <label className={WeddingRSVPFormStyle.label}>
              Ονοματεπώνυμο
            </label>
            <input
              className={WeddingRSVPFormStyle.input}
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Πλήρες όνομα"
            />
          </div>

          {/* Email */}
          <div className={WeddingRSVPFormStyle.section}>
            <label className={WeddingRSVPFormStyle.label}>Email</label>
            <input
              className={WeddingRSVPFormStyle.input}
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="example@email.com"
            />
          </div>

          {/* Guests */}
          <div className={WeddingRSVPFormStyle.section}>
            <label className={WeddingRSVPFormStyle.label}>
              Αριθμός ενηλίκων
            </label>
            <input
              type="number"
              min="0"
              className={WeddingRSVPFormStyle.input}
              value={adults}
              onChange={(e) => {
                const val = Number(e.target.value);
                setAdults(val);
                updateGuestNames(val + children);
              }}
            />

            <label className={WeddingRSVPFormStyle.label}>
              Αριθμός παιδιών
            </label>
            <input
              type="number"
              min="0"
              className={WeddingRSVPFormStyle.input}
              value={children}
              onChange={(e) => {
                const val = Number(e.target.value);
                setChildren(val);
                updateGuestNames(adults + val);
              }}
            />

            <label className={WeddingRSVPFormStyle.label}>
              Ονόματα καλεσμένων ({adults + children})
            </label>

            {guestNames.map((g, i) => (
              <input
                key={i}
                className={WeddingRSVPFormStyle.input}
                value={g}
                placeholder={`Όνομα #${i + 1}`}
                onChange={(e) => {
                  const newNames = [...guestNames];
                  newNames[i] = e.target.value;
                  setGuestNames(newNames);
                }}
              />
            ))}
          </div>

          {/* Allergies */}
          <div className={WeddingRSVPFormStyle.section}>
            <label className={WeddingRSVPFormStyle.label}>
              Έχετε κάποια αλλεργία;
            </label>

            <div style={{ display: "flex", gap: "10px" }}>
              <label className={WeddingRSVPFormStyle.customRadio}>
                <input
                  type="radio"
                  name="allergy"
                  value="yes"
                  checked={hasAllergy === true}
                  onChange={() => setHasAllergy(true)}
                />
                <div className={WeddingRSVPFormStyle.radioButton}>Ναι</div>
              </label>

              <label className={WeddingRSVPFormStyle.customRadio}>
                <input
                  type="radio"
                  name="allergy"
                  value="no"
                  checked={hasAllergy === false}
                  onChange={() => setHasAllergy(false)}
                />
                <div className={WeddingRSVPFormStyle.radioButton}>Όχι</div>
              </label>
            </div>

            {hasAllergy === true && (
              <input
                className={WeddingRSVPFormStyle.input}
                placeholder="Παρακαλώ αναφέρετε"
                value={allergyDetails}
                onChange={(e) => setAllergyDetails(e.target.value)}
              />
            )}
          </div>

          {/* Diet */}
          <div className={WeddingRSVPFormStyle.section}>
            <label className={WeddingRSVPFormStyle.label}>
              Διατροφικές προτιμήσεις
            </label>
            <select
              className={WeddingRSVPFormStyle.input}
              onChange={(e) => setDiet(e.target.value)}
            >
              <option value="">Καμία</option>
              <option value="vegetarian">Χορτοφάγος</option>
              <option value="vegan">Vegan</option>
            </select>
          </div>

          {/* Songs */}
          <div className={WeddingRSVPFormStyle.section}>
            <label className={WeddingRSVPFormStyle.label}>
              Προτάσεις τραγουδιών
            </label>
            <input
              className={WeddingRSVPFormStyle.input}
              placeholder="Προτείνετε τραγούδια για το γλέντι"
              value={songs}
              onChange={(e) => setSongs(e.target.value)}
            />
          </div>

          <button
            className={WeddingRSVPFormStyle.submitButton}
            type="submit"
            disabled={loading}
          >
            {loading ? "Αποστολή..." : "Υποβολή"}
          </button>
        </form>
      )}
    </div>
  );
};