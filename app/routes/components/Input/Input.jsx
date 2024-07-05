import React, { useState } from "react";
import "./Input.css";
import {Text} from '@shopify/polaris';

export const Input = ({ onSubmit,filters,activefilters }) => {
    // const [filters,setFilters] = useState([
    //     {id:4,title:"Stock",metakey:'stock'},
    //     {id:5,title:"Color",metakey:'color'},
    //     {id:6,title:"Availability",metakey:'availability'},
    // ]);
//     const [filters,setFilters] = useState([]);
//     const [activefilters,setActivefilters] = useState([]);
//     useEffect(() => {
//     const getmetafields = () => {
//         const requestOptions = {
//             method: "GET",
//             redirect: "follow"
//           };
            
//             fetch("https://auto.searchalytics.com/search_auto_dashboard_shopify_backend/filters/send_all_metafields.php?shopify_store=flextread", requestOptions)
//             .then((response) => response.text())
//             .then((result) => {
//                  const data = JSON.parse(result);
//                 const allMetafieldDefinitions = data.allMetafieldDefinitions;
//                 console.log('result',result,"allMetafieldDefinitions",allMetafieldDefinitions);
//                 setFilters([]);
//                 const newFilters = allMetafieldDefinitions.map((metafield, index) => ({
//                     id: 1000 + index, 
//                     title: metafield.name,
//                     metakey: metafield.key
//                 }));
                
//                 setFilters(prevFilters=>[...prevFilters,...newFilters]);
//                 const activemetafilters = data.activeFilters;
//                 setActivefilters([]);
//                 const newactiveFilters = activemetafilters.map((field, index) => ({
//                     id: 2000 + index, 
//                     title: field.name,
//                     metakey: field.custom_field_key
//                 }));
//                 setActivefilters(prevFilters=>[...prevFilters,...newactiveFilters]);
//             })
//             .catch((error) => console.error(error));
//     }
//     getmetafields();
// }, []); 
    
    const handleSubmitSelect = (event) => {
        const currentInputtitle = event.target.getAttribute('data-name');
        const currentInputmeta = event.target.getAttribute('data-meta');
        const currentInputid = event.target.getAttribute('data-id');
        onSubmit(currentInputid,currentInputtitle,currentInputmeta);
        event.target.disabled = true;
    }
    // const [input,setInput] = useState("Stock");
    // const [inputmeta,setInputmeta] = useState("stock");
    // const handleSubmit = (event) => {
    //     if(!input) return;
    //     onSubmit(input,inputmeta);
    //     const element = event.target;
    //     element.disabled = true;
    // };
    // const [input1,setInput1] = useState("Color");
    // const [inputmeta1,setInputmeta1] = useState("color");
    // const handleSubmit1 = (event) => {
    //     if(!input1) return;
    //     onSubmit(input1,inputmeta1);
    //     const element = event.target;
    //     element.disabled = true;
    // };
    // const [input2,setInput2] = useState("Availability");
    // const [inputmeta2,setInputmeta2] = useState("availability");
    // const handleSubmit2 = (event) => {
    //     if(!input2) return;
    //     onSubmit(input2,inputmeta2);
    //     const element = event.target;
    //     element.disabled = true;
    // };
    const isActiveFilter = (filterTitle) => {
        // Assuming activeFilters is your array of active filters
        return activefilters.some(activeFilter => activeFilter.name === filterTitle);
    };
    return (
        <div className="filters-list">
            {/* <Text variant="headingLg" as="h5">
                 Configure Filters
            </Text> */}
            
        {/* <div className="options-container">
           <div className="option">
                <input type="text" readOnly className="input" value="{input}" onChange={e=>setInput(e.target.value)} />
                <button onClick={handleSubmit} data-name={input}  className="button">{input}</button>
           </div>
           <div className="option">
                <input type="text" readOnly className="input" value="{input1}" onChange={e=>setInput1(e.target.value)} />
                <button onClick={handleSubmit1} data-name={input1}  className="button">{input1}</button>
           </div>
           <div className="option">
                <input type="text" readOnly className="input" value="{input2}" onChange={e=>setInput2(e.target.value)} />
                <button onClick={handleSubmit2} data-name={input2}  className="button">{input2}</button>
           </div>
        </div> */}
        <label class="dropdown">

                <div class="dd-button">
                    Choose
                </div>

                <input type="checkbox" class="dd-input" id="test"/>

                <ul class="dd-menu">
                    {/* <li>
                        <div className="option">
                                <input type="text" readOnly className="input" value="{input}" onChange={e=>setInput(e.target.value)} />
                                <button onClick={handleSubmit} data-name={input} data-meta={inputmeta} className="button">{input}</button>
                        </div>
                    </li>
                    <li>
                        <div className="option">
                                <input type="text" readOnly className="input" value="{input1}" onChange={e=>setInput1(e.target.value)} />
                                <button onClick={handleSubmit1} data-name={input1} data-meta={inputmeta1} className="button">{input1}</button>
                        </div>
                    </li>
                    <li>
                        <div className="option">
                                <input type="text" readOnly className="input" value="{input2}" onChange={e=>setInput2(e.target.value)} />
                                <button onClick={handleSubmit2} data-name={input2} data-meta={inputmeta2} className="button">{input2}</button>
                        </div>
                    </li> */}
                    {filters
                    .map((filter)=>(
                        <li key={filter.id}>
                            <div className="option">
                                    <input type="text" readOnly className="input" value="{filter.title}" onChange={e=>setInput2(e.target.value)} />
                                    <button onClick={handleSubmitSelect} data-id={filter.id} data-name={filter.title} data-meta={filter.metakey} className="button"  disabled={filter.is_active} >{filter.title}</button>
                            </div>
                        </li>
                    ))
                    }
                    {/* {activefilters.map((filter)=>(
                        <li key={filter.id}>
                            <div className="option">
                                    <input type="text" readOnly className="input" value="{filter.title}" onChange={e=>setInput2(e.target.value)} />
                                    <button onClick={handleSubmitSelect} data-name={filter.title} data-meta={filter.metakey} className="button" disabled>{filter.title}</button>
                            </div>
                        </li>
                    ))} */}
                </ul>
                
                </label>
    </div>
    )
};