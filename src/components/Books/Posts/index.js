import React, { useState,useEffect } from 'react';
import {Link} from "react-router-dom";
import Resform from "../../Resform";
import FormSelect from '../../forms/FormSelect';
import {db} from "../../firebase"

function Posts({field, book,timestamp}) {


  // const [response1, setResponse1] = useState("");
    const parseTimestamp = (timestamp) => {
        try {
            let date = new Date(timestamp)
            return date.toUTCString()
        } catch (error) {
            console.error(error)
            return timestamp
        }
    }

    return (
      <>
       <div class="modal-body">
      <table class="table table-hover">
  <thead>
    <tr>
      <th style={{color: "white"}}  scope="col">Time Posted</th>
      <th style={{color: "white"}} scope="col">Academic Field</th>
      <th style={{color: "white"}}  scope="col"></th>
      <th style={{color: "white"}}  scope="col">Book</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <th style={{color: "white"}}  scope="row">{parseTimestamp(timestamp)}</th>
      <td style={{color: "white"}}>{field}</td>
      <td style={{color: "white"}}></td>
      <td style={{color: "white"}}>{book}</td>
    </tr>
   
   
  </tbody>
</table>
      </div>

        </>
   
    )
}

export default Posts
