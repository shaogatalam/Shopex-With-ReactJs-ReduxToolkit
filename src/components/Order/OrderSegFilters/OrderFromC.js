import React, { useState } from "react";
import { DateRangePicker } from "rsuite";
import "rsuite/dist/rsuite.css";

import { format } from "date-fns";
import startOfMonth from "date-fns/startOfMonth";
import endOfMonth from "date-fns/endOfMonth";
import startOfYear from "date-fns/startOfYear";
import { addDays, subDays, getDate } from "date-fns";
import moment from "moment";

function OrderFromC({onChange}) {

  var [dr, setdr] = useState([
    new Date(moment().startOf("month")),
    new Date(moment().endOf("month")),
  ]);

  return (
    
    <div className="input-filters">
    
      <strong>Order From Specific Date-Range : </strong>
    
      <div className="date-period">
    
        <DateRangePicker
          //placement='rightEnd'
          label="Timeline"
          value={dr}
          // onChange={setdr}
          onChange={(value) => {
            setdr(value);
            onChange('o_cus_mail', value);
          }}
          oneTap={false}
          ranges={[
            {label: "Yesterday", value: [addDays(new Date(), -1), addDays(new Date(), -1)]},
            {label: "Today", value: [new Date(), new Date()]},
            {label: "Tomorrow", value: [addDays(new Date(), 1), addDays(new Date(), 1)]},
            {label: "Last 7 days", value: [subDays(new Date(), 6), new Date()]},
            {label: "This month", value: [subDays(new Date(), getDate(new Date()) - 1), new Date()]},
            {label: "Last month",value: [startOfMonth(subDays(new Date(), getDate(new Date()))),endOfMonth(subDays(new Date(), getDate(new Date()))),]},
            {label: "Year To date",value: [startOfYear(new Date()), new Date()]},
          ]}>

        </DateRangePicker>

      </div>

      <input name="order_table_dr" type={"hidden"} value={format(dr[0], "yyyy-MM-dd") + "To" + format(dr[1], "yyyy-MM-dd")}/>

    </div>

  );

}

export default OrderFromC;
