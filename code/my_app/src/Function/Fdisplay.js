import React from 'react';
import { useLocation } from "react-router-dom";
import { useTranslation } from 'react-i18next';
function Fdisplay(){
    const location=useLocation();
      const {t,i18n } = useTranslation();
    const data1=location.state.seedData;
    const name1=location.state.name;
    const name2=location.state.name1;
    const name3=location.state.name2;
    const data2=location.state.fertilizer;
    const data3=location.state.pesticide;
    console.log(data2)
    const lng=i18n.language;
    console.log(i18n.language)
    return(<>
    <div>
       { name1 ?(<div className="heading">{lng==='te'?"విత్తనాలు":"Seeds"}</div>):null}
{data1 ? (
  <div className="seeds">
    {data1.filter(item => item.type === "Seed").map((data, ind) => (
           <div key={ind} style={{ borderRadius: "2rem" }}>
            <p>{t("product")}:{lng==='te'? data.product_te:data.product}</p> {/* Assuming this is the correct field for fertilizer name */}
            <p>{t("price")}: {data.price}</p>
            <p>{t('size')}:{data.quantity}</p>
          </div> 
        ))
    }
  </div>
) : null}

          { name2 ?(<div className="heading">{lng==='te'?"పురుగుమందుల":"Fertilizer"}</div>):null}
{data2 ? (
  <div className="seeds">
    {data2.filter(item => item.type === "Fertilizer").map((data, ind) => (
          <div key={ind} style={{ borderRadius: "2rem" }}>
            <p>{t("product")}:{lng==='te'? data.product_te:data.product}</p> {/* Assuming this is the correct field for fertilizer name */}
            <p>{t("price")}: {data.price}</p>
            <p>{t('size')}:{data.quantity}</p>
          </div>
        ))
    }
  </div>
) : null}


 { name3 ?(<div className="heading">{lng==='te'?"ఎరువులు":"Pesticide"}</div>):null}
{data3 ? (
  <div className="seeds">
    {
      data3.filter(item => item.type === "Pesticide").map((data, ind) => (
          <div key={ind} style={{ borderRadius: "2rem" }}>
            <p>{t("product")}:{lng==='te'? data.product_te:data.product}</p> {/* Assuming this is the correct field for fertilizer name */}
            <p>{t("price")}:{data.price}</p>
            <p>{t('size')}:{data.quantity}</p>
          </div>
        ))
    }
  </div>
) : null}
    </div>
    </>)
}
export default Fdisplay;