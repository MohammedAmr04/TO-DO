import { faFaceSmileBeam, faTrashCan } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React, { useContext, useState } from 'react'
import { ListContext } from '../../../Context/ListContext';

export default function NewNote({ data }) {
    let {deleteNote} =useContext(ListContext)
    const [imgSrc, setImgSrc] = useState(data.checked === true ? "/images/CHECKED.svg" : "/images/DEFAULT.svg");

    // Function to handle image click
    const handleImageClick = () => {
        setImgSrc(() => {
            if (data.checked === false) {
                data.checked = true; 
                return "/images/CHECKED.svg"; 
            } else {
                
                data.checked = false; 
                return "/images/DEFAULT.svg"; 
            }
        });
    };

    
    const deleteItem = () => {
        deleteNote(data.id);
    };

  return (
      <div className="check-boxs container">
          <div className="d-flex mb-3 justify-content-between pt-3 pb-3 ps-2 pe-2 position-relative list">
              <div className="title d-flex align-items-center">
                  <div className="checked "><img src={imgSrc} onClick={handleImageClick} alt="" /></div>
                  <FontAwesomeIcon
                      icon={faFaceSmileBeam}
                      className="ms-2 me-2"
                      style={{ color: 'yellow' }}
                  />
                  {data.title}
              </div>
              <div>
                  <FontAwesomeIcon
                      className="ms-1 me-3 trash"
                      icon={faTrashCan}
                      onClick={deleteItem}
                  />

              </div>
          </div>
      </div>
  )
}
