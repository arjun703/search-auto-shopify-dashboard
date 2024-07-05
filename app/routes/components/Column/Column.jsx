import React from "react";
import './Column.css';
import {SortableContext,verticalListSortingStrategy,} from "@dnd-kit/sortable";
import { Task } from "../Task/Task";
import {Text} from '@shopify/polaris';
import { Input } from "../Input/Input";
export const Column = ({ onRemove,activefilters,onEdit,triggerModal,onSubmit,filters }) => {
    return (
        <div className="column-wrap">
            <div className="column_headers">
                <Text variant="headingLg" as="h5">
                    Configure Filters
                </Text>
                <Input onSubmit={onSubmit}  filters={filters} activefilters={activefilters} />
            </div>
        
        
    <div className="column">
        
        <SortableContext items={activefilters} strategy={verticalListSortingStrategy} distance={1}>
            {activefilters.filter(filter => filter.is_active).map((task)=>(
                <Task id={task.id} title={task.title} key={task.id} metakey={task.metakey} onRemove={onRemove} onEdit={onEdit} triggerModal={triggerModal}/>
            ))}
        </SortableContext>
    </div>
    </div>
    )
};