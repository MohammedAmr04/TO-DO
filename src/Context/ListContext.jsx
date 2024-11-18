import React, { createContext, useState } from 'react';

// Create ListContext
export const ListContext = createContext();

export default function ListProvider(props) {
    // State declarations
    const [lists, setLists] = useState([]); // Stores all lists
    const [chooseList, setChooseList] = useState({}); // Currently selected list
    const [list, setList] = useState({}); // Individual list state (currently unused)
    const [checkBox, setCheckBox] = useState([]); // Stores checkboxes of the selected list

    /**
     * Add a new list
     * Generates a new list object and appends it to the `lists` state
     */
    const addNewList = () => {
        const newList = {
            id: `${lists.length + 1}`, // Unique ID based on length
            title: `New List ${lists.length + 1}`, // Dynamic title
            checkBoxs: [] // Initially empty checkboxes
        };
        setLists([...lists, newList]); // Update lists with the new list
    };

    /**
     * Delete a list by ID
     * Removes the list from `lists` and reindexes remaining lists
     */
    const deleteList = (id) => {
        const updatedLists = lists.filter((list) => list.id !== id); // Remove the list
        const reIndexedLists = updatedLists.map((list, index) => ({
            ...list,
            id: `${index + 1}` // Reassign sequential IDs
        }));
        setLists(reIndexedLists); // Update state with reindexed lists
    };

    /**
     * Add a new note to the selected list
     * Updates both `chooseList` and its checkboxes
     */
    const addNewNote = () => {
        const newNote = {
            id: `${chooseList.checkBoxs.length + 1}`, // Unique ID within the selected list
            title: 'Write Text', // Default note title
            checked: false // Initially unchecked
        };
        const updatedCheckBox = [...checkBox, newNote];
        setCheckBox(updatedCheckBox); // Update local checkboxes state

        const updatedList = {
            ...chooseList,
            checkBoxs: updatedCheckBox // Add new note to checkboxes
        };
        setChooseList(updatedList); // Update selected list

        // Update `lists` with the modified `chooseList`
        const temp = lists.filter(list => list.id !== chooseList.id);
        temp.push(updatedList);
        setLists(temp);
    };

    /**
     * Delete a note by ID
     * Removes the note from the current checkboxes state
     */
    const deleteNote = (id) => {
        const updated = checkBox.filter((box) => box.id !== id); // Remove the note
        setCheckBox(updated); // Update local checkboxes state
    };

    return (
        <ListContext.Provider
            value={{
                // Functions
                addNewList,
                deleteList,
                addNewNote,
                deleteNote,

                // States
                lists,
                checkBox,
                list,
                chooseList,

                // State setters
                setChooseList,
                setCheckBox,
                setLists
            }}
        >
            {props.children}
        </ListContext.Provider>
    );
}
