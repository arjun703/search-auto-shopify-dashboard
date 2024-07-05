import {
  Box,
  Card,
  Layout,
  Link,
  List,
  Page,
  PageActions,
  Text,
  Button,
  BlockStack,
  Icon

} from "@shopify/polaris";
import {DndContext, KeyboardSensor, PointerSensor, TouchSensor, closestCorners, useSensor, useSensors} from "@dnd-kit/core";
import { useState, useEffect } from "react";
import { Column } from "./components/Column/Column";
import "./components/Column/Column.css";
import { arrayMove, sortableKeyboardCoordinates } from "@dnd-kit/sortable";
import { Input } from "./components/Input/Input";
import {
  CheckCircleIcon
} from '@shopify/polaris-icons';
import { Modal } from "./components/Modal/Modal";
import { useLoaderData } from "@remix-run/react";
import { authenticate } from "../shopify.server";
// import "./list.css";

export const loader = async ({ request }) => {
  const { admin, session } = await authenticate.admin(request);
      const { shop } = session;
  return shop;
  };
export default function AdditionalPage() {
  // const [tasks,setTasks] = useState([
  //   {id:1,title:"Price",metakey:'price'},
  //   {id:2,title:"Collection",metakey:'collection'},
  //   {id:3,title:"Vendor",metakey:'vendor'},
  // ]);

  const [filters,setFilters] = useState([]);
  const [modalfilterid,setModalfilterid] = useState("");
  const [modalfiltertitle,setModalfiltertitle] = useState("");
  const [modalfiltermeta,setModalfiltermeta] = useState("");
    const [activefilters,setActivefilters] = useState([]);
    const [activefiltersused,setActivefiltersused] = useState([]);
    const shop = useLoaderData();
  console.log("shop",shop);
    useEffect(() => {
    const getmetafields = () => {
        const requestOptions = {
            method: "GET",
            redirect: "follow",
            headers: {
              "shop-name" : shop
            }
          };
            
            fetch("https://auto.searchalytics.com/search_auto_dashboard_shopify_backend/filters/send_all_metafields.php?shopify_store=flextread", requestOptions)
            .then((response) => response.text())
            .then((result) => {
                 const data = JSON.parse(result);
                const allMetafieldDefinitions = data.allMetafieldDefinitions;
                console.log('result',result,"allMetafieldDefinitions",allMetafieldDefinitions);
                setFilters([]);
                setActivefilters([]);
                
                const activemetafilters = data.activeFilters;
               
                const newactiveFilters = activemetafilters.map((field, index) => ({
                    id: 2000 + index, 
                    title: field.name,
                    metakey: field.custom_field_key,
                    is_active: true
                }));
                setActivefilters(prevFilters=>[...prevFilters,...newactiveFilters]);
                setFilters(prevFilters=>[...prevFilters,...newactiveFilters]);
                
                const newFilters = allMetafieldDefinitions
                .filter(metafield => !activemetafilters.some(activeFilter => activeFilter.custom_field_key === metafield.key))
                .map((metafield, index) => ({
                  id: 3000 + index, 
                  title: metafield.name,
                  metakey: metafield.key,
                  is_active: false
              }));
              
              setFilters(prevFilters=>[...prevFilters,...newFilters]);
              setActivefilters(prevFilters=>[...prevFilters,...newFilters]);
            })
            .catch((error) => console.error(error));
    }
    getmetafields();
}, []); 
const triggerModal = (filterId, newTitle,metakey) =>{
  setModalfiltertitle(newTitle);
  setModalfilterid(filterId);
  setModalfiltermeta(metakey);
  console.log(modalfiltertitle,modalfilterid,modalfiltermeta)
  document.getElementById("editor_modal").show();
}
  const updateActiveFilterTitle = (filterId, newTitle) => {
  
    console.log('edit triggered',newTitle);
    setActivefilters(prevFilters => {
        return prevFilters.map(filter => {
            if (filter.id === filterId) {
                console.log(`Updating filter with ID ${filterId} to title ${newTitle}`);
                return { ...filter, title: newTitle };
            }else{
              console.log(`Filter with ID ${filter.id} does not match ${filterId}, keeping unchanged`);
              return filter;
            }
        });
    });
  };
  const addTask = (id,title,metakey) => {
    setFilters(prevTasks => {
      return prevTasks.map(task => {
          if (task.id === id) {
              return { ...task, is_active: true };
          }
          // If the id doesn't match, return the task unchanged
          return task;
      });
    });
    setActivefilters(prevtasks => [...prevtasks, {id:id,title:title,metakey:metakey,is_active:true}])
    
  }
  const removeTask = (id,title,metakey) => {
    setFilters(prevTasks => {
      return prevTasks.map(task => {
          if (task.id === id) {
              return { ...task, is_active: false };
          }
          // If the id doesn't match, return the task unchanged
          return task;
      });
    });
     setActivefilters(tasks => tasks.filter(task => task.metakey !== metakey));
  }

  const getTaskPos = id => activefilters.findIndex(task=>task.id===id);
  const handleDragEnd = event => {
    const {active,over} = event;
    if(active.id === over.id) return;

    setActivefilters(tasks => {
      const originalPos = getTaskPos(active.id);
      const newPos = getTaskPos(over.id);

      return arrayMove(tasks,originalPos,newPos);
    })
  }

  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(TouchSensor),
    useSensor(KeyboardSensor,{
      coordinateGetter : sortableKeyboardCoordinates,
    }),
  );
  const handleSave = () =>{
    document.getElementById("save_success_modal").hide();
  }
  const handleSubmitData = () =>{
    const dataToSend = {
      store: "flextread",
      activeCustomFields: []
  }
    console.log('submit trigger',activefilters);
    activefilters.forEach((filter, index) => {
        // Extract values from the filter object
        const { id, title, metakey,is_active } = filter;
        if(is_active){
        // Create a new object with desired keys
        const customField = {
          custom_field_key: metakey,
          custom_field_name: title,
          hard_coded_or_dynamic : "dynamic",
          sort_order: index + 1,
          visibility: 1
        };
        // Append the customField object to activeCustomFields array
        dataToSend.activeCustomFields.push(customField);
      }

    });
    const myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");
    myHeaders.append("shop-name", shop);

    const raw = JSON.stringify(dataToSend);

    const requestOptions = {
      method: "POST",
      headers: myHeaders,
      body: raw,
      redirect: "follow"
    };

    console.log(requestOptions);

  fetch("https://auto.searchalytics.com/search_auto_dashboard_shopify_backend/filters/save.php", requestOptions)
    .then((response) => response.text())
    .then((result) => {
      console.log("resultresultresult",result);
      document.getElementById("save_success_modal").show();
    })
    .catch((error) => console.error(error));

  }
  return (
    <Page>
      {/* <ui-title-bar title="Filters" /> */}
      <Layout id="configure-filter-block">
      <Text variant="headingXl" as="h1" id="configuration-page-title">
        Filters
      </Text>
      <Modal id={modalfilterid} title={modalfiltertitle}  metakey={modalfiltermeta} onEdit={updateActiveFilterTitle} />
      <Box background="bg-surface" padding="400" width="700px" borderRadius="150">
       <DndContext sensors={sensors} onDragEnd={handleDragEnd} collisionDetection={closestCorners}>
        <Column onRemove={removeTask} activefilters={activefilters} onEdit={updateActiveFilterTitle} triggerModal={triggerModal} onSubmit={addTask} filters={filters}/>
        {/* <Input onSubmit={addTask}  filters={filters} activefilters={activefilters} /> */}
       </DndContext>
       </Box>
       <div className="page-actions-wrap">
       <PageActions id="configurations-save"
        primaryAction={<Button variant="primary" onBlur={handleSubmitData}>
              Save</Button>}
        />
        </div>
      </Layout>
      
      <ui-modal id="save_success_modal" variant="small" >
            
                <div className="success_message"> 
          <Icon
            source={CheckCircleIcon}
            tone="base"
            color="green"
          /><span>Settings Saved</span></div>
            <ui-title-bar title="Success">
                <button onClick={handleSave}>OK</button>
            </ui-title-bar>
        </ui-modal>
      {/* <PageActions
        primaryAction={<Button variant="primary" onBlur={handleSubmitData}>
          Save</Button>}
    /> */}
    </Page>
  );
}

