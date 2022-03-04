import React, {useEffect, useState} from 'react';
import "./Modal.css";
const URL = "http://localhost:4000/DataStreams";
const ID = '1';

const Modal = (props) => {

    const [data, setData] = useState([]);
  
    const getDataList=()=> {
      fetch(`${URL}/${ID}`).then(resp=>resp.json())
      .then(resp=>console.log(resp)); //This is where I/you lol left off, can console.log the data but setData(resp) isnt working... good luck. Do this or try to pass data in through props, might be the way to go
    };

    const closeOnEsc = (e) => {
        if((e.charCode || e.keyCode) === 27){
            props.onClose();
        }
    }

    useEffect(() => {
        getDataList();
        console.log(data);
        document.body.addEventListener('keydown', closeOnEsc)
        return function cleanup() {
            document.body.removeEventListener('keydown', closeOnEsc);
        }
    }, [])

    if(!props.show){
        return null;
    }

    return (
        <div className='modal' onClick={props.onClose} style={{height: document.body.scrollHeight+20}}>
            <div className='modal-content' onClick={e => e.stopPropagation()}>
                <div className='modal-header'>
                    <h4 className='modal-title'>{props.title}</h4>
                </div>
                <div className='modal-body'>{props.children}</div>
                <div className='modal-footer'>
                    <button onClick={props.onClose} className='exitButton'>X</button>
                </div>
            </div>
        </div>

    )
}

export default Modal;