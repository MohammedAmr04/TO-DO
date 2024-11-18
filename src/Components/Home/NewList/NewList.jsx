import React, { useContext } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronRight, faFaceSmileBeam, faTrashCan } from '@fortawesome/free-solid-svg-icons';
import { useNavigate } from 'react-router-dom';
import { ListContext } from '../../../Context/ListContext';

export default function NewList({ list, deleteList }) {
    const navigate = useNavigate(); // Initialize the hook here
    const { setChooseList } = useContext(ListContext);

    // Handle the deletion of a list item
    const deleteItem = () => {
        deleteList(list.id); // Call deleteList function with the list ID
    };

    // Handle choosing a list and navigating to the list page
    const chooseList = () => {
        setChooseList(list); // Update the context with the selected list
        navigate('/list'); // Navigate to the '/list' page
    };

    return (
        <div className="d-flex mb-3 justify-content-between pt-3 pb-3 ps-2 pe-2 position-relative list">
            {/* List Title */}
            <div className="title">
                <FontAwesomeIcon
                    icon={faFaceSmileBeam}
                    className="ms-2 me-2"
                    style={{ color: 'yellow' }}
                />
                {list.title}
            </div>

            {/* Action Icons */}
            <div>
                {/* Trash Icon for Deleting a List */}
                <FontAwesomeIcon
                    className="ms-1 me-3 trash"
                    icon={faTrashCan}
                    onClick={deleteItem}
                />

                {/* Chevron Icon for Choosing a List */}
                <FontAwesomeIcon
                    icon={faChevronRight}
                    className="trash"
                    onClick={chooseList}
                />
            </div>
        </div>
    );
}
