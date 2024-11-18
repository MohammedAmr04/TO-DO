import React, { useContext, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircleArrowLeft, faCirclePlus, faTrashCan } from '@fortawesome/free-solid-svg-icons';
import { COLORS } from '../../Variables';
import '../Global.css';
import NewNote from './NewNote/NewNote';
import { ListContext } from '../../Context/ListContext';
import { useNavigate } from 'react-router-dom';

export default function DisplayList() {
    // Destructure necessary functions and state from ListContext
    let { addNewNote, deleteNote, lists, checkBox, setCheckBox, chooseList, setLists } = useContext(ListContext);
    let navigate = useNavigate();

    // Effect to set checkboxes when chooseList is changed
    useEffect(() => {
        setCheckBox(chooseList.checkBoxs);
    }, [chooseList, setCheckBox]);

    function deleteLists() {
        const updatedLists = lists.filter(list => list.id !== chooseList.id); // Filter out the current list
        setLists(updatedLists); // Update the lists in the context
        setCheckBox([]); // Reset the checkboxes to prevent unintended state
    }
    const handleDeleteNavigation = () => {
        deleteLists(); // Update the lists before navigation
        navigate('/home'); // Navigate back to the home page
    };

    // Function to update the current list with the selected checkbox state
    function update() {
        const updatedLists = lists.filter(list => list.id !== chooseList.id); // Filter out the current list
        updatedLists.push({ ...chooseList, checkBoxs: checkBox }); // Add the updated list with the new checkboxes
        setLists(updatedLists); // Update the lists in the context
        setCheckBox([]); // Reset the checkboxes to prevent unintended state
    }

    // Function to handle back navigation
    const handleBackNavigation = () => {
        update(); // Update the lists before navigation
        navigate('/home'); // Navigate back to the home page
    };

    return (
        <div className='choose-list vh-100'>
            {/* Navbar Section */}
            <nav className="container position-relative d-flex justify-content-between align-items-center flex-wrap pb-5 pt-5">
                <div className="left">
                    <FontAwesomeIcon
                        icon={faCircleArrowLeft}
                        role='button'
                        className='pe-1'
                        onClick={handleBackNavigation}
                    />
                    {chooseList.title}
                </div>
                <div className="right d-flex justify-content-between" style={{ color: COLORS.primary }}>
                    <div className="button-hover" onClick={handleDeleteNavigation}>
                        <FontAwesomeIcon icon={faTrashCan} className="ps-1 pe-1" /> Delete List
                    </div>
                    <div className="button-hover" onClick={addNewNote}>
                        <FontAwesomeIcon icon={faCirclePlus} className="ps-1 pe-1" /> Add to-do
                    </div>
                </div>
            </nav>

            {/* Render Notes */}
            {checkBox.map((box) => (
                <NewNote data={box} key={box.id} deleteNote={deleteNote} />
            ))}
        </div>
    );
}
