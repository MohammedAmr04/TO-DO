import React, { useContext } from 'react';
import './Home.css';
import NewList from './NewList/NewList';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCirclePlus } from '@fortawesome/free-solid-svg-icons';
import { COLORS } from '../../Variables';
import '../Global.css';
import { ListContext } from '../../Context/ListContext';

export default function Home() {
    // Context variables
    const { addNewList, deleteList, lists } = useContext(ListContext);

    return (
        <div className="home vh-100 w-100">
            {/* Navbar Section */}
            <nav className="container position-relative d-flex justify-content-between align-items-center flex-wrap pb-5 pt-5">
                <div className="left">TO DO | YOUR LISTS</div>
                <div className="right" style={{ color: COLORS.primary }}>
                    <div className="button-hover" onClick={addNewList}>
                        <FontAwesomeIcon icon={faCirclePlus} className="ps-1 pe-1" /> Add New List
                    </div>
                </div>
            </nav>

            {/* Lists Section */}
            <div className="container position-relative">
                <div className="lists">
                    {lists && lists.length > 0 ? (
                        // Displaying the lists
                        lists.map((list, index) => (
                            <NewList
                                key={list.id || index}
                                list={list}
                                deleteList={deleteList}
                            />
                        ))
                    ) : (
                        // Message if no lists are available
                        <p className="position-absolute start-50 top-50 translate-middle text-center">
                            No lists available. Click <strong>"Add New List"</strong> to create one!
                        </p>
                    )}
                </div>
            </div>
        </div>
    );
}
