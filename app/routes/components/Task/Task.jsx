import React from "react";
import './Task.css';
import {Icon,Button} from '@shopify/polaris';
import {
    DeleteIcon
  } from '@shopify/polaris-icons';
import {
DragHandleIcon
} from '@shopify/polaris-icons';
import {
    SettingsIcon
  } from '@shopify/polaris-icons';
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { Modal } from "../Modal/Modal";

export const Task = ({id,title,key,metakey,onRemove,onEdit,triggerModal}) => {
    const handleRemoveItem = (event)=>  {
        const dataname  = event.target.getAttribute('data-name');
        if(dataname){
            if(document.querySelector('.option button[data-name="'+dataname+'"]')){
                document.querySelector('.option button[data-name="'+dataname+'"]').removeAttribute('disabled');
            }
            onRemove(id,title,metakey);
        }
    };
    const handlesettings = (event)=>  {
        // const element = event.target;
        // if(element){

        //     const modalid = 'my_modal_'+element.getAttribute('data-metakey');
        //     console.log('modalid',modalid)
        //     const modal_elem = document.getElementById(''+modalid);
        //     if(modal_elem){

        //         modal_elem.show();
        //     }
        //     triggerModal={triggerModal}
        // }
        triggerModal(id,title,metakey);
    };
    const handlesvgclick = (event)=>  {
        const parentElement = event.target.parentElement;
        const clickEvent = new MouseEvent('click', {
            bubbles: true,
            cancelable: true,
            view: window
        });
        parentElement.dispatchEvent(clickEvent);

    };
    const {attributes,listeners,setNodeRef,transform,transition} = useSortable({id});
    const style = {
        transition,
        transform : CSS.Transform.toString(transform)
    };
    
    return (
        <div className="main_list_wrapper" data-id={id} data-title={title} data-metakey={metakey}>
            
            <div ref={setNodeRef} {...attributes} {...listeners} style={style} className="task">
                <Icon
                source={DragHandleIcon}
                tone="base"
                />
                {title}
            </div>
            <button  data-name={title} data-metakey={metakey} className="settingsbutton" onClick={handlesettings}>
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" onClick={handlesvgclick} ><path fill-rule="evenodd" d="M12.5 10a2.5 2.5 0 1 1-5 0 2.5 2.5 0 0 1 5 0Zm-1.5 0a1 1 0 1 1-2 0 1 1 0 0 1 2 0Z"/><path fill-rule="evenodd" d="M9.377 2.5c-.926 0-1.676.75-1.676 1.676v.688c0 .056-.043.17-.198.251-.153.08-.303.168-.448.262-.147.097-.268.076-.318.048l-.6-.346a1.676 1.676 0 0 0-2.29.613l-.622 1.08a1.676 1.676 0 0 0 .613 2.289l.648.374c.048.028.124.12.119.29a5.484 5.484 0 0 0 .005.465c.009.175-.07.27-.119.299l-.653.377a1.676 1.676 0 0 0-.613 2.29l.623 1.08a1.676 1.676 0 0 0 2.29.613l.7-.405c.048-.028.166-.048.312.043.115.071.233.139.353.202.155.08.198.195.198.251v.811c0 .926.75 1.676 1.676 1.676h1.246c.926 0 1.676-.75 1.676-1.676v-.81c0-.057.042-.171.197-.252.121-.063.239-.13.354-.202.146-.091.264-.07.312-.043l.7.405a1.676 1.676 0 0 0 2.29-.614l.623-1.08a1.676 1.676 0 0 0-.613-2.289l-.653-.377c-.05-.029-.128-.123-.119-.3a5.494 5.494 0 0 0 .005-.463c-.005-.171.07-.263.12-.291l.647-.374a1.676 1.676 0 0 0 .613-2.29l-.623-1.079a1.676 1.676 0 0 0-2.29-.613l-.6.346c-.049.028-.17.048-.318-.048a5.4 5.4 0 0 0-.448-.262c-.155-.081-.197-.195-.197-.251v-.688c0-.926-.75-1.676-1.676-1.676h-1.246Zm-.176 1.676c0-.097.078-.176.176-.176h1.246c.097 0 .176.079.176.176v.688c0 .728.462 1.298 1.003 1.58.11.058.219.122.323.19.517.337 1.25.458 1.888.09l.6-.346a.176.176 0 0 1 .24.064l.623 1.08a.176.176 0 0 1-.064.24l-.648.374c-.623.36-.888 1.034-.868 1.638a4.184 4.184 0 0 1-.004.337c-.032.615.23 1.31.867 1.677l.653.377a.176.176 0 0 1 .064.24l-.623 1.08a.176.176 0 0 1-.24.065l-.701-.405c-.624-.36-1.341-.251-1.855.069a3.91 3.91 0 0 1-.255.145c-.54.283-1.003.853-1.003 1.581v.811a.176.176 0 0 1-.176.176h-1.246a.176.176 0 0 1-.176-.176v-.81c0-.73-.462-1.3-1.003-1.582a3.873 3.873 0 0 1-.255-.146c-.514-.32-1.23-.428-1.855-.068l-.7.405a.176.176 0 0 1-.241-.065l-.623-1.08a.176.176 0 0 1 .064-.24l.653-.377c.637-.368.899-1.062.867-1.677a3.97 3.97 0 0 1-.004-.337c.02-.604-.245-1.278-.868-1.638l-.648-.374a.176.176 0 0 1-.064-.24l.623-1.08a.176.176 0 0 1 .24-.064l.6.346c.638.368 1.37.247 1.888-.09a3.85 3.85 0 0 1 .323-.19c.54-.282 1.003-.852 1.003-1.58v-.688Z"/></svg>
            </button>
            
            
            <button  data-name={title} className="removebutton" onClick={handleRemoveItem}>
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" onClick={handlesvgclick} ><path d="M11.5 8.25a.75.75 0 0 1 .75.75v4.25a.75.75 0 0 1-1.5 0v-4.25a.75.75 0 0 1 .75-.75Z"/><path d="M9.25 9a.75.75 0 0 0-1.5 0v4.25a.75.75 0 0 0 1.5 0v-4.25Z"/><path fill-rule="evenodd" d="M7.25 5.25a2.75 2.75 0 0 1 5.5 0h3a.75.75 0 0 1 0 1.5h-.75v5.45c0 1.68 0 2.52-.327 3.162a3 3 0 0 1-1.311 1.311c-.642.327-1.482.327-3.162.327h-.4c-1.68 0-2.52 0-3.162-.327a3 3 0 0 1-1.311-1.311c-.327-.642-.327-1.482-.327-3.162v-5.45h-.75a.75.75 0 0 1 0-1.5h3Zm1.5 0a1.25 1.25 0 1 1 2.5 0h-2.5Zm-2.25 1.5h7v5.45c0 .865-.001 1.423-.036 1.848-.033.408-.09.559-.128.633a1.5 1.5 0 0 1-.655.655c-.074.038-.225.095-.633.128-.425.035-.983.036-1.848.036h-.4c-.865 0-1.423-.001-1.848-.036-.408-.033-.559-.09-.633-.128a1.5 1.5 0 0 1-.656-.655c-.037-.074-.094-.225-.127-.633-.035-.425-.036-.983-.036-1.848v-5.45Z"/></svg>
            </button>
            
        </div>
    );
};