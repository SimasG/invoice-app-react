import { StyledNewInvoiceModal } from "../styles/NewInvoiceModal.styled";
import { DatePicker } from "@mantine/dates";

const NewInvoiceModal = () => {
  document.querySelectorAll(".option").forEach((option) => {
    option.addEventListener("click", () => {
      document.querySelector(".selected").innerHTML =
        option.querySelector("label").innerHTML;
      document.querySelector(".options-container").classList.remove("active");
    });
  });

  return (
    <StyledNewInvoiceModal className="new-invoice-modal-overlay">
      <main className="new-invoice-modal-container">
        <h1>
          Edit <span>#</span>XM9141
        </h1>
        <section className="bill-from-container">
          <p className="bill-from-parapgrah">Bill From</p>
          <div className="from-address-container">
            <div className="street-address">
              <label>Street Address</label>
              <input type="text" placeholder="Street Address" />
            </div>
            <div className="from-address-subcontainer">
              <div className="city">
                <label>City</label>
                <input type="text" placeholder="City" />
              </div>
              <div className="post-code">
                <label>Post Code</label>
                <input type="text" placeholder="Post Code" />
              </div>
              <div className="country">
                <label>Country</label>
                <input type="text" placeholder="country" />
              </div>
            </div>
          </div>
        </section>
        <section className="bill-to-container">
          <p className="bill-to-parapgrah">Bill To</p>
          <div className="client-info-container">
            <div className="client-name">
              <label>Client's Name</label>
              <input type="text" placeholder="Client's Name" />
            </div>
            <div className="client-email">
              <label>Client's Email</label>
              <input type="text" placeholder="Client's Email" />
            </div>
            <div className="client-street-address">
              <label>Street Address</label>
              <input type="text" placeholder="Street Address" />
            </div>
            <div className="to-address-subcontainer">
              <div className="to-city">
                <label>City</label>
                <input type="text" placeholder="City" />
              </div>
              <div className="to-post-code">
                <label>Post Code</label>
                <input type="text" placeholder="Post Code" />
              </div>
              <div className="to-country">
                <label>Country</label>
                <input type="text" placeholder="country" />
              </div>
            </div>
          </div>
          <div className="invoice-info-container">
            <DatePicker
              styles={{
                wrapper: {
                  width: "24rem",
                },
                calendarHeader: {
                  width: "22rem",
                },
                month: {
                  width: "22rem",
                },
                dropdown: {
                  width: "24rem",
                },
                arrow: {
                  color: "green",
                },
              }}
              className="mantine-date-picker"
              placeholder="Pick date"
              label="Invoice date"
            />
            <div className="payment-terms-container">
              <label>Payment Terms</label>
              <div className="payment-terms-select-box">
                <div className="options-container">
                  <div className="option">
                    <input
                      type="radio"
                      className="radio"
                      id="net-1-day"
                      name="payment-term-date"
                    />
                    <label htmlFor="net-1-day">Net 1 Day</label>
                  </div>
                  <div className="option">
                    <input
                      type="radio"
                      className="radio"
                      id="net-7-days"
                      name="payment-term-date"
                    />
                    <label htmlFor="net-7-days">Net 7 Days</label>
                  </div>
                  <div className="option">
                    <input
                      type="radio"
                      className="radio"
                      id="net-14-days"
                      name="payment-term-date"
                    />
                    <label htmlFor="net-14-days">Net 14 Days</label>
                  </div>
                  <div className="option">
                    <input
                      type="radio"
                      className="radio"
                      id="net-30-days"
                      name="payment-term-date"
                    />
                    <label htmlFor="net-30-days">Net 30 Days</label>
                  </div>
                </div>
                <div
                  className="selected"
                  onClick={() => {
                    document
                      .querySelector(".options-container")
                      .classList.toggle("active");
                  }}
                >
                  <h4>Select Payment Terms</h4>
                </div>
              </div>
            </div>
          </div>
        </section>
        {/* <section className="item-list-container">
        </section> */}
      </main>
    </StyledNewInvoiceModal>
  );
};

export default NewInvoiceModal;
