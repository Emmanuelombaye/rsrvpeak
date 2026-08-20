"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import { useSearchParams } from "next/navigation";
import { products, type Product } from "@/lib/data";
import { withBase } from "@/lib/paths";

const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
const states = [
  "AL","AK","AZ","AR","CA","CO","CT","DE","FL","GA","HI","ID","IL","IN","IA","KS","KY","LA","ME","MD",
  "MA","MI","MN","MS","MO","MT","NE","NV","NH","NJ","NM","NY","NC","ND","OH","OK","OR","PA","RI","SC",
  "SD","TN","TX","UT","VT","VA","WA","WV","WI","WY","DC",
];

const screeningConditions = [
  "Pregnancy, trying to conceive, or breastfeeding",
  "Personal or family history of medullary thyroid carcinoma or MEN2",
  "History of pancreatitis",
  "Severe gastrointestinal disease",
];

function money(product: Product) {
  return product.price.replace(".00", "").replace("/mo", "");
}

export function CheckoutForm() {
  const params = useSearchParams();
  const slug = params.get("product") || "tirzepatide";
  const product = products.find((item) => item.slug === slug) || products[0];
  const [step, setStep] = useState(1);
  const [done, setDone] = useState(false);
  const [sex, setSex] = useState("");
  const [conditions, setConditions] = useState("");
  const years = useMemo(() => Array.from({ length: 100 }, (_, i) => 2026 - i), []);
  const price = money(product);

  function go(next: number) {
    setStep(next);
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  if (done) {
    return (
      <main className="checkout">
        <div className="wrap checkout-done">
          <p className="eyebrow">Intake received</p>
          <h1>A licensed provider will review your information.</h1>
          <p className="lede">
            You will only be billed if approved. Typical review is within 24 hours. A clinician may message you if more
            detail is needed.
          </p>
          <Link className="btn btn-primary" href="/shop">
            Back to Shop
          </Link>
        </div>
      </main>
    );
  }

  return (
    <main className="checkout">
      <div className="wrap">
        <p className="checkout-kicker">Checkout</p>
        <div className="checkout-grid">
          <form
            className="checkout-steps"
            onSubmit={(event) => {
              event.preventDefault();
              if (step < 4) go(step + 1);
              else setDone(true);
            }}
          >
            <section className={`cko-step${step === 1 ? " open" : ""}`}>
              <button type="button" className="cko-head" onClick={() => go(1)}>
                <span>1</span> Step 1 — Patient Information
              </button>
              {step === 1 ? (
                <div className="cko-card">
                  <label>
                    Email Address *
                    <input required type="email" placeholder="you@email.com" />
                  </label>
                  <div className="cko-two">
                    <label>
                      First Name *
                      <input required />
                    </label>
                    <label>
                      Last Name *
                      <input required />
                    </label>
                  </div>
                  <label>
                    Phone Number *
                    <input required type="tel" placeholder="(555) 123-4567" />
                  </label>
                  <fieldset>
                    <legend>Date of Birth *</legend>
                    <div className="cko-three">
                      <select required defaultValue="">
                        <option value="" disabled>
                          Month
                        </option>
                        {months.map((m, i) => (
                          <option key={m} value={i + 1}>
                            {m}
                          </option>
                        ))}
                      </select>
                      <select required defaultValue="">
                        <option value="" disabled>
                          Day
                        </option>
                        {Array.from({ length: 31 }, (_, i) => (
                          <option key={i + 1}>{i + 1}</option>
                        ))}
                      </select>
                      <select required defaultValue="">
                        <option value="" disabled>
                          Year
                        </option>
                        {years.map((y) => (
                          <option key={y}>{y}</option>
                        ))}
                      </select>
                    </div>
                  </fieldset>
                  <fieldset>
                    <legend>Sex Assigned at Birth *</legend>
                    <div className="sex-row">
                      {["Male", "Female"].map((option) => (
                        <button
                          key={option}
                          type="button"
                          className={sex === option ? "on" : ""}
                          onClick={() => setSex(option)}
                        >
                          {option}
                        </button>
                      ))}
                    </div>
                  </fieldset>
                  <button className="btn btn-primary" type="submit" disabled={!sex}>
                    Continue to Shipping
                  </button>
                </div>
              ) : null}
            </section>

            <section className={`cko-step${step === 2 ? " open" : ""}`}>
              <button type="button" className="cko-head" onClick={() => step > 1 && go(2)}>
                <span>2</span> Step 2 — Shipping Address
              </button>
              {step === 2 ? (
                <div className="cko-card">
                  <label>
                    Street Address *
                    <input required placeholder="123 Main Street" />
                  </label>
                  <label>
                    Apartment / Suite (Optional)
                    <input />
                  </label>
                  <div className="cko-three">
                    <label>
                      City *
                      <input required />
                    </label>
                    <label>
                      State *
                      <select required defaultValue="">
                        <option value="" disabled>
                          State
                        </option>
                        {states.map((st) => (
                          <option key={st}>{st}</option>
                        ))}
                      </select>
                    </label>
                    <label>
                      ZIP / Postcode *
                      <input required />
                    </label>
                  </div>
                  <button className="btn btn-primary" type="submit">
                    Continue to Medical Screening
                  </button>
                </div>
              ) : null}
            </section>

            <section className={`cko-step${step === 3 ? " open" : ""}`}>
              <button type="button" className="cko-head" onClick={() => step > 2 && go(3)}>
                <span>3</span> Step 3 — Medical Screening
              </button>
              {step === 3 ? (
                <div className="cko-card">
                  <fieldset>
                    <legend>Do any of the following conditions apply to you? *</legend>
                    <ul className="screen-list">
                      {screeningConditions.map((item) => (
                        <li key={item}>{item}</li>
                      ))}
                    </ul>
                    <div className="sex-row">
                      {[
                        { value: "yes", label: "Yes, one or more" },
                        { value: "no", label: "No, none apply" },
                      ].map((option) => (
                        <button
                          key={option.value}
                          type="button"
                          className={conditions === option.value ? "on" : ""}
                          onClick={() => setConditions(option.value)}
                        >
                          {option.label}
                        </button>
                      ))}
                    </div>
                  </fieldset>
                  <button className="btn btn-primary" type="submit" disabled={!conditions}>
                    Continue to Agreements
                  </button>
                </div>
              ) : null}
            </section>

            <section className={`cko-step${step === 4 ? " open" : ""}`}>
              <button type="button" className="cko-head" onClick={() => step > 3 && go(4)}>
                <span>4</span> Step 4 — Agreements & Checkout
              </button>
              {step === 4 ? (
                <div className="cko-card">
                  <label className="agree">
                    <input required type="checkbox" />
                    <span>
                      I agree to the <Link href="/terms">Terms of Service</Link>,{" "}
                      <Link href="/consent">Medical Consent</Link> form, and acknowledge the{" "}
                      <Link href="/consent">Telehealth Informed Consent</Link> for specialized medical protocols. *
                    </span>
                  </label>
                  <label className="agree">
                    <input required type="checkbox" />
                    <span>
                      I authorize independently licensed clinicians affiliated with RSRV to review my intake and, if
                      appropriate, prescribe treatment. *
                    </span>
                  </label>
                  <p className="lede">
                    This page submits your medical intake. Payment is not collected here. You are billed only if a licensed
                    provider approves treatment.
                  </p>
                  <button className="btn btn-primary" type="submit">
                    Submit intake for review
                  </button>
                </div>
              ) : null}
            </section>
          </form>

          <aside className="order-card">
            <h3>Order Summary</h3>
            <div className="order-product">
              <img src={withBase(product.img)} alt="" />
              <div>
                <h4>{product.name}</h4>
                <p>Monthly program</p>
              </div>
            </div>
            <div className="order-row">
              <span>Subtotal</span>
              <strong>{price}</strong>
            </div>
            <div className="order-row">
              <span>Shipping</span>
              <strong>Free</strong>
            </div>
            <div className="order-row">
              <span>Medical Consultation</span>
              <strong>Included</strong>
            </div>
            <div className="order-row total">
              <span>Due if approved</span>
              <strong>{price}</strong>
            </div>
            <p className="lede">
              This page submits your medical intake. Payment is not collected here. You are billed only if a licensed
              provider approves treatment.
            </p>
          </aside>
        </div>
      </div>
    </main>
  );
}
