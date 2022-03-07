import React, {useEffect, useState} from 'react';
import "./Modal.css";

const Modal = (props) => {
    const URL = "http://localhost:4000/DataStreams";
    let ID = props.idNumber;

    const [data, setData] = useState([]);
  
    function getDataList() {
      fetch(`${URL}/${ID}`).then(resp=>resp.json())
      .then(resp=>setData(resp));
    }

    const closeOnEsc = (e) => {
        if((e.charCode || e.keyCode) === 27){
            props.onClose();
        }
    }

    useEffect(() => {
            getDataList();
        document.body.addEventListener('keydown', closeOnEsc)
        return function cleanup() {
            document.body.removeEventListener('keydown', closeOnEsc);
        }
    }, [])

    useEffect(() => {
        getDataList();
    }, [props])

    if(!props.show){
        return null;
    }

    return (
        <div className='modal' onClick={props.onClose} style={{height: document.body.scrollHeight+20}}>
            <div className='modal-content' onClick={e => e.stopPropagation()}>
                <div className='modal-header'>
                    <h4 className='modal-title'>{data["Vendor name"]}</h4>
                </div>
                <div className='modal-body'><ul>
                <li> Vendor contact: {data["Vendor contact"]}</li>
                <li> Buisness Unit Acquiring: {data["Buisness Unit Acquiring"]}</li>
                <li> Lead Data Steward: {data["Lead Data Steward"]}</li>
                <li> Business Contact: {data["Business Contact"]}</li>
                <li> Main Users of Data: {data["Main Users of Data"]}</li>
                <li> Brief Desc of Data Used: {data["Brief Desc of Data Used"]}</li>
                <li> Value Dervied From Data: {data["Value Dervied From Data"]}</li>
                <li> Contracts in Zycus: {data["Contracts in Zycus"]}</li>
                <li> IT Source: {data["IT Source"]}</li>
                <li> <div>
                <a
                    href={`https://www.google.com`}
                    target="_blank"
                    rel="noopener noreferrer" >
                    Relevant Contact
                </a>
                </div></li>
                </ul> </div>
                <div className='modal-footer'>
                    <button onClick={props.onClose} className='exitButton'>X</button>
                </div>
            </div>
        </div>

    )
}

export default Modal;