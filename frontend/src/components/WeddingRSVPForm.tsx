import WeddingRSVPFormStyle from "./WeddingRSVPForm.module.css";
import { useState } from "react";
import { FaCheck } from "react-icons/fa";
import { useTranslation } from "react-i18next";

export const WeddingRSVPForm = () => {
  const { t } = useTranslation();

  const [attending, setAttending] = useState<boolean | null>(null);

  const [adults, setAdults] = useState(0);
  const [children, setChildren] = useState(0);

  const [adultNames, setAdultNames] = useState<string[]>([]);
  const [childNames, setChildNames] = useState<string[]>([]);

  const [babyCart, setBabyCart] = useState<boolean | null>(null);

  const [adultAllergies, setAdultAllergies] = useState<string[]>([]);
  const [adultDiet, setAdultDiet] = useState<string[]>([]);

  const [childAllergies, setChildAllergies] = useState<string[]>([]);
  const [childDiet, setChildDiet] = useState<string[]>([]);

  const [songs, setSongs] = useState("");

  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  // Helpers
  const updateAdults = (count: number) => {
    setAdults(count);
    setAdultNames(Array(count).fill("").map((_, i) => adultNames[i] || ""));
    setAdultAllergies(Array(count).fill(""));
    setAdultDiet(Array(count).fill(""));
  };

  const updateChildren = (count: number) => {
    setChildren(count);
    setChildNames(Array(count).fill("").map((_, i) => childNames[i] || ""));
    setChildAllergies(Array(count).fill(""));
    setChildDiet(Array(count).fill(""));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (attending === null) {
      return alert(t("rsvp.errors.attending"));
    }

    if (attending && adults === 0) {
      return alert(t("rsvp.errors.adults"));
    }

    if (adultNames.some((n) => !n.trim())) {
      return alert(t("rsvp.errors.names"));
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
            adults,
            children,
            adultNames,
            childNames,
            babyCart,
            adultAllergies,
            adultDiet,
            childAllergies,
            childDiet,
            songs,
          }),
        }
      );

      if (!res.ok) throw new Error();

      setSubmitted(true);
    } catch (err) {
      alert(t("rsvp.errors.submit"));
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={WeddingRSVPFormStyle.main}>
      <div className={WeddingRSVPFormStyle.wrapper}>
        <div className={WeddingRSVPFormStyle.card}>
          <div className={WeddingRSVPFormStyle.outerWrapper}>
            <h1 className={WeddingRSVPFormStyle.h1}>
              {t("rsvp.title")}
            </h1>
            <p className={WeddingRSVPFormStyle.p}>
              {t("rsvp.subtitle")}
            </p>
          </div>

          {submitted ? (
            <p className={WeddingRSVPFormStyle.createdAt}>
              <FaCheck /> {t("rsvp.success")}
            </p>
          ) : (
            <form className={WeddingRSVPFormStyle.form} onSubmit={handleSubmit}>

              {/* Attendance */}
              <div className={WeddingRSVPFormStyle.section}>
                <label className={WeddingRSVPFormStyle.label}>
                  {t("rsvp.attending")}
                </label>

                <div style={{ display: "flex", gap: "10px" }}>
                  <label className={WeddingRSVPFormStyle.customRadio}>
                    <input type="radio" name="attending" onChange={() => setAttending(true)} />
                    <div className={WeddingRSVPFormStyle.radioButton}>
                      {t("common.yes")}
                    </div>
                  </label>

                  <label className={WeddingRSVPFormStyle.customRadio}>
                    <input type="radio" name="attending" onChange={() => setAttending(false)} />
                    <div className={WeddingRSVPFormStyle.radioButton}>
                      {t("common.no")}
                    </div>
                  </label>
                </div>
              </div>

              {/* Adults */}
              {attending && (
                <div className={WeddingRSVPFormStyle.section}>
                  <label className={WeddingRSVPFormStyle.label}>
                    {t("rsvp.adults")}
                  </label>

                  <div className={WeddingRSVPFormStyle.counterControls}>
                    <button type="button" onClick={() => updateAdults(Math.max(0, adults - 1))}>−</button>
                    <span>{adults}</span>
                    <button type="button" onClick={() => updateAdults(adults + 1)}>+</button>
                  </div>

                  {adultNames.map((name, i) => (
                    <div key={i}>
                      <input
                        className={WeddingRSVPFormStyle.input}
                        placeholder={t("rsvp.fullName") + ` #${i + 1}`}
                        value={name}
                        onChange={(e) => {
                          const newArr = [...adultNames];
                          newArr[i] = e.target.value;
                          setAdultNames(newArr);
                        }}
                      />

                      <input
                        className={WeddingRSVPFormStyle.input}
                        placeholder={t("rsvp.allergies")}
                        value={adultAllergies[i]}
                        onChange={(e) => {
                          const arr = [...adultAllergies];
                          arr[i] = e.target.value;
                          setAdultAllergies(arr);
                        }}
                      />

                      <select
                        className={WeddingRSVPFormStyle.input}
                        value={adultDiet[i]}
                        onChange={(e) => {
                          const arr = [...adultDiet];
                          arr[i] = e.target.value;
                          setAdultDiet(arr);
                        }}
                      >
                        <option value="">{t("rsvp.none")}</option>
                        <option value="vegetarian">{t("rsvp.vegetarian")}</option>
                        <option value="vegan">{t("rsvp.vegan")}</option>
                      </select>
                    </div>
                  ))}
                </div>
              )}

              {/* Children */}
              {attending && (
                <div className={WeddingRSVPFormStyle.section}>
                  <label className={WeddingRSVPFormStyle.label}>
                    {t("rsvp.children")}
                  </label>

                  <div className={WeddingRSVPFormStyle.counterControls}>
                    <button type="button" onClick={() => updateChildren(Math.max(0, children - 1))}>−</button>
                    <span>{children}</span>
                    <button type="button" onClick={() => updateChildren(children + 1)}>+</button>
                  </div>

                  {children > 0 && (
                    <>
                      <label className={WeddingRSVPFormStyle.label}>
                        {t("rsvp.babyCart")}
                      </label>

                      <div style={{ display: "flex", gap: "10px" }}>
                        <label className={WeddingRSVPFormStyle.customRadio}>
                          <input type="radio" name="cart" onChange={() => setBabyCart(true)} />
                          <div className={WeddingRSVPFormStyle.radioButton}>
                            {t("common.yes")}
                          </div>
                        </label>

                        <label className={WeddingRSVPFormStyle.customRadio}>
                          <input type="radio" name="cart" onChange={() => setBabyCart(false)} />
                          <div className={WeddingRSVPFormStyle.radioButton}>
                            {t("common.no")}
                          </div>
                        </label>
                      </div>
                    </>
                  )}

                  {childNames.map((_, i) => (
                    <div key={i}>
                      <input
                        className={WeddingRSVPFormStyle.input}
                        placeholder={t("rsvp.childAllergies") + ` #${i + 1}`}
                        value={childAllergies[i]}
                        onChange={(e) => {
                          const arr = [...childAllergies];
                          arr[i] = e.target.value;
                          setChildAllergies(arr);
                        }}
                      />

                      <select
                        className={WeddingRSVPFormStyle.input}
                        value={childDiet[i]}
                        onChange={(e) => {
                          const arr = [...childDiet];
                          arr[i] = e.target.value;
                          setChildDiet(arr);
                        }}
                      >
                        <option value="">{t("rsvp.none")}</option>
                        <option value="vegetarian">{t("rsvp.vegetarian")}</option>
                        <option value="vegan">{t("rsvp.vegan")}</option>
                      </select>
                    </div>
                  ))}
                </div>
              )}

              {/* Songs */}
              <div className={WeddingRSVPFormStyle.section}>
                <label className={WeddingRSVPFormStyle.label}>
                  {t("rsvp.songs")}
                </label>
                <input
                  className={WeddingRSVPFormStyle.input}
                  placeholder={t("rsvp.songsPlaceholder")}
                  value={songs}
                  onChange={(e) => setSongs(e.target.value)}
                />
              </div>

              <button
                className={WeddingRSVPFormStyle.submitButton}
                type="submit"
                disabled={loading}
              >
                {loading ? t("rsvp.submitting") : t("rsvp.submit")}
              </button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};