import React from 'react'

const Payment = () => {
  return (
    <>
    <div
  className="container shadow-sm py-5 px-5 rounded-2 my-5"
  style={{ backgroundColor: "white" }}
>
  <main>
    <div className="py-5 text-center">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width={60}
        height={60}
        style={{ verticalAlign: "middle", color: "#FFCD29" }}
        fill="currentColor"
        className="bi bi-wallet2"
        viewBox="0 0 16 16"
      >
        <path d="M12.136.326A1.5 1.5 0 0 1 14 1.78V3h.5A1.5 1.5 0 0 1 16 4.5v9a1.5 1.5 0 0 1-1.5 1.5h-13A1.5 1.5 0 0 1 0 13.5v-9a1.5 1.5 0 0 1 1.432-1.499L12.136.326zM5.562 3H13V1.78a.5.5 0 0 0-.621-.484L5.562 3zM1.5 4a.5.5 0 0 0-.5.5v9a.5.5 0 0 0 .5.5h13a.5.5 0 0 0 .5-.5v-9a.5.5 0 0 0-.5-.5h-13z" />
      </svg>
      <h1 className="fw-bold mt-2">الدفع</h1>
    </div>
    <div className="row g-3">
      <div className="col-md-5 col-lg-4 order-md-last">
        <h4 className="d-flex justify-content-between align-items-center mb-3">
          <span className="text-body-secondary">عربة التسوق</span>
          <span className="badge bg-secondary rounded-pill">3</span>
        </h4>
        <ul className="list-group mb-3">
          <li className="list-group-item d-flex justify-content-between lh-sm">
            <div>
              <h6 className="my-0">اسم المنتج</h6>
              <small className="text-body-secondary">وصف مختصر</small>
            </div>
            <span className="text-body-secondary">$12</span>
          </li>
          <li className="list-group-item d-flex justify-content-between lh-sm">
            <div>
              <h6 className="my-0">المنتج الثاني</h6>
              <small className="text-body-secondary">وصف مختصر</small>
            </div>
            <span className="text-body-secondary">$8</span>
          </li>
          <li className="list-group-item d-flex justify-content-between lh-sm">
            <div>
              <h6 className="my-0">البند الثالث</h6>
              <small className="text-body-secondary">وصف مختصر</small>
            </div>
            <span className="text-body-secondary">$5</span>
          </li>
          <li className="list-group-item d-flex justify-content-between bg-body-tertiary">
            <div className="text-success">
              <h6 className="my-0">رمز ترويجي</h6>
              <small>EXAMPLECODE</small>
            </div>
            <span className="text-success">-$5</span>
          </li>
          <li className="list-group-item d-flex justify-content-between">
            <span>مجموع (JD)</span>
            <strong>$20</strong>
          </li>
        </ul>
        <form className="card p-2">
          <div className="input-group">
            <input
              type="text"
              className="form-control"
              placeholder="رمز ترويجي"
            />
            <button type="submit" className="btn btn-secondary">
              تحقق
            </button>
          </div>
        </form>
      </div>
      <div className="col-md-7 col-lg-8">
        <h4 className="mb-3">عنوان الفاتورة</h4>
        <form className="needs-validation" noValidate="">
          <div className="row g-3">
            <div className="col-sm-6">
              <label htmlFor="firstName" className="form-label">
                الاسم الأول
              </label>
              <input
                type="text"
                className="form-control"
                id="firstName"
                placeholder=""
                defaultValue=""
                required=""
              />
              <div className="invalid-feedback">يرجى إدخال اسم أول صحيح.</div>
            </div>
            <div className="col-sm-6">
              <label htmlFor="lastName" className="form-label">
                اسم العائلة
              </label>
              <input
                type="text"
                className="form-control"
                id="lastName"
                placeholder=""
                defaultValue=""
                required=""
              />
              <div className="invalid-feedback">يرجى إدخال اسم عائلة صحيح.</div>
            </div>
          
            <div className="col-12">
              <label htmlFor="address" className="form-label">
                العنوان
              </label>
              <input
                type="text"
                className="form-control"
                id="address"
                placeholder="1234 الشارع الأول"
                required=""
              />
              <div className="invalid-feedback">
                يرجى إدخال عنوان الشحن الخاص بك.
              </div>
            </div>
            <div className="col-12">
              <label htmlFor="address2" className="form-label">
                عنوان 2 <span className="text-body-secondary">(اختياري)</span>
              </label>
              <input
                type="text"
                className="form-control"
                id="address2"
                placeholder="شقة 24"
              />
            </div>
            <div className="col-md-5">
              <label htmlFor="country" className="form-label">
                البلد
              </label>
              <select className="form-select" id="country">
                <option value="">اختر...</option>
                <option value="jordan">الأردن</option>
              </select>
              <div className="invalid-feedback">يرجى اختيار بلد صحيح.</div>
            </div>
            <div className="col-md-4">
              <label htmlFor="state" className="form-label">
                المنطقة
              </label>
              <select className="form-select" id="state">
                <option value="">اختر...</option>
                <option value="zarqa">الزرقاء</option>
              </select>
              <div className="invalid-feedback">
                يرجى اختيار اسم منطقة صحيح.
              </div>
            </div>
            <div className="col-md-3">
              <label htmlFor="zip" className="form-label">
                الرمز البريدي
              </label>
              <input
                type="text"
                className="form-control"
                id="zip"
                placeholder=""
                required=""
              />
              <div className="invalid-feedback">الرمز البريدي مطلوب.</div>
            </div>
          </div>
          <hr className="my-4" />
          <div className="form-check bg-dark text-light rounded-1">
            <input
              type="checkbox"
              className="form-check-input me-1"
              id="same-address"
            />
            <label className="form-check-label" htmlFor="same-address">
              عنوان الشحن هو نفس عنوان الفاتورة الخاص بي
            </label>
          </div>
          <div className="form-check bg-dark text-light rounded-1">
            <input
              type="checkbox"
              className="form-check-input me-1"
              id="save-info"
            />
            <label className="form-check-label" htmlFor="save-info">
              احفظ هذه المعلومات في المرة القادمة
            </label>
          </div>
          <hr className="my-4" />
          <h4 className="mb-3">طريقة الدفع</h4>
          <div className="my-3">
            <div className="form-check bg-dark text-light rounded-1">
              <input
                id="credit"
                name="paymentMethod"
                type="radio"
                className="form-check-input me-1"
                defaultChecked=""
                required=""
              />
              <label className="form-check-label " htmlFor="credit">
                بطاقة ائتمان
              </label>
            </div>
            <div className="form-check bg-dark text-light rounded-1">
              <input
                id="cash"
                name="paymentMethod"
                type="radio"
                className="form-check-input me-1"
                required=""
              />
              <label className="form-check-label" htmlFor="cash">
                نقد
              </label>
            </div>
            <div className="form-check bg-dark text-light rounded-1">
              <input
                id="paypal"
                name="paymentMethod"
                type="radio"
                className="form-check-input me-1"
                required=""
              />
              <label className="form-check-label" htmlFor="paypal">
                PayPal
              </label>
            </div>
          </div>
          <div className="row gy-3">
            <div className="col-md-6">
              <label htmlFor="cc-name" className="form-label">
                الاسم على البطاقة
              </label>
              <input
                type="text"
                className="form-control"
                id="cc-name"
                placeholder=""
                required=""
              />
              <small className="text-danger">
                الاسم الكامل كما هو معروض على البطاقة
              </small>
              <div className="invalid-feedback">الاسم على البطاقة مطلوب</div>
            </div>
            <div className="col-md-6">
              <label htmlFor="cc-number" className="form-label">
                رقم البطاقة
              </label>
              <input
                type="text"
                className="form-control"
                id="cc-number"
                placeholder=""
                required=""
              />
              <div className="invalid-feedback">رقم بطاقة الائتمان مطلوب</div>
            </div>
            <div className="col-md-3">
              <label htmlFor="cc-expiration" className="form-label">
                تاريخ انتهاء الصلاحية
              </label>
              <input
                type="text"
                className="form-control"
                id="cc-expiration"
                placeholder=""
                required=""
              />
              <div className="invalid-feedback">
                تاريخ انتهاء الصلاحية مطلوب
              </div>
            </div>
            <div className="col-md-3">
              <label htmlFor="cc-cvv" className="form-label">
                الرمز الثلاثي (CVV)
              </label>
              <input
                type="text"
                className="form-control"
                id="cc-cvv"
                placeholder=""
                required=""
              />
              <div className="invalid-feedback">رمز الحماية مطلوب</div>
            </div>
          </div>
          <hr className="my-4" />
          <button className="w-100 btn btn-dark btn-lg" type="submit">
            الاستمرار بالدفع
          </button>
        </form>
      </div>
    </div>
  </main>
</div>

    </>
  )
}

export default Payment