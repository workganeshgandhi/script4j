/*
 * Copyright (c) 2018-2019 Pavel Kastornyy. All rights reserved.
 * The specified copyright does not cover application programming interface
 * (API) and the documentation for this API, which were taken from other
 * libraries. See NOTICE file for more information.
 *
 * DO NOT ALTER OR REMOVE COPYRIGHT NOTICES OR THIS FILE HEADER.
 *
 * This code is free software; you can redistribute it and/or modify it
 * under the terms of the GNU General Public License version 2 only, as
 * published by the Free Software Foundation. Copyright holder designates
 * this particular file as subject to the "Classpath" exception as provided
 * by copyright holder in the LICENSE file that accompanied this code.
 *
 * This code is distributed in the hope that it will be useful, but WITHOUT
 * ANY WARRANTY; without even the implied warranty of MERCHANTABILITY or
 * FITNESS FOR A PARTICULAR PURPOSE.  See the GNU General Public License
 * version 2 for more details (a copy is included in the LICENSE file that
 * accompanied this code).
 *
 * You should have received a copy of the GNU General Public License version
 * 2 along with this work; if not, write to the Free Software Foundation,
 * Inc., 51 Franklin St, Fifth Floor, Boston, MA 02110-1301 USA.
 *
 */

import { Styleable } from './../css/Styleable';
import { EventTarget } from 'script4jfx.base';
import { EventDispatchChain } from 'script4jfx.base';
import { EventDispatcher } from 'script4jfx.base';
import { ObjectProperty } from 'script4jfx.base';
import { SimpleObjectProperty } from 'script4jfx.base';
import { FXCollections } from 'script4jfx.base';
import { ReadOnlyObjectProperty } from 'script4jfx.base';
import { ReadOnlyObjectWrapper } from 'script4jfx.base';
import { StringProperty } from 'script4jfx.base';
import { SimpleStringProperty } from 'script4jfx.base';
import { ObservableValue } from 'script4jfx.base';
import { EventHandler } from 'script4jfx.base';
import { KeyEvent } from './input/KeyEvent';
import { Parent } from './Parent';
import { Scene } from './Scene';
import { NodeEventHandlerManager } from './../internal/scene/NodeEventHandlerManager';
import { EventType } from 'script4jfx.base';
import { Event } from 'script4jfx.base';
import { ObservableList } from 'script4jfx.base';
import { Consumer } from 'script4j.base';
import { Iterator } from 'script4j.base';
import 'jquery';

export abstract class Node implements Styleable, EventTarget {

    /**
     * Html element for this Node. No setter for this field!
     */
    private readonly element: ReadOnlyObjectWrapper<HTMLElement> = new ReadOnlyObjectWrapper<HTMLElement>(null, this);
    
    /**
     * The parent of this Node.
     */
    private readonly parent: ReadOnlyObjectWrapper<Parent> = new ReadOnlyObjectWrapper<Parent>(null, this);
    
    /**
     * The Scene that this Node is part of.
     */
    private readonly scene: ReadOnlyObjectWrapper<Scene> = new ReadOnlyObjectWrapper<Scene>(null, this);
    
    /**
     * The manager of event handlers.
     */
    private readonly eventHandlerManager: NodeEventHandlerManager = new NodeEventHandlerManager(this);
    
    /**
     * Specifies the event dispatcher for this node.
     */
    private eventDispatcher: ObjectProperty<EventDispatcher> = null;
    
    /**
     * The id of this Node.
     */
    private id: StringProperty = null;

    /**
     * A string representation of the CSS style associated with this specific Node.
     */    
    private style: StringProperty = null;
    
    /**
     * Defines a function to be called when this Node or its child Node has input focus and a key has been pressed.
     */    
    private onKeyPressed: ObjectProperty<EventHandler<KeyEvent>> = null;

    /**
     * Defines a function to be called when this Node or its child Node has input focus and a key has been released.
     */
    private onKeyReleased: ObjectProperty<EventHandler<KeyEvent>> = null;
    
    /**
     * Defines a function to be called when this Node or its child Node has input focus and a key has been typed.
     */
    private onKeyTyped: ObjectProperty<EventHandler<KeyEvent>> = null;
        
    /**
     * Sets the element, taken from buildHtmlElement().
     */
    constructor() {
        let element: HTMLElement = this.createElement();
        this.element.set(element);
        if (element.style.cssText !== "") {
            this.setStyle(element.style.cssText);
        }
    }

    /**
     * Gets the value of the property element.
     */
    public getElement(): HTMLElement {
        return this.element.get();
    }

    /**
     * Specifies the element for this node.
     */    
    public elementProperty(): ReadOnlyObjectProperty<HTMLElement> {
        return this.element.getReadOnlyProperty();
    }    
    
    /**
     * The parent of this Node. If this Node has not been added to a scene graph, then parent will be null.
     */
    public parentProperty(): ReadOnlyObjectProperty<Parent> {
        return this.parent.getReadOnlyProperty();
    }

    /**
     * Gets the value of the property parent.
     */    
    public getParent(): Parent {
        return this.parent.get();
    }
    
    /**
     * Gets the value of the property scene.
     */
    public getScene(): Scene {
        return this.scene.get();
    }

    /**
     * The Scene that this Node is part of.
     */
    public sceneProperty(): ReadOnlyObjectProperty<Scene> {
        return this.scene.getReadOnlyProperty();
    }    
    
    /**
     * Gets the value of the property eventDispatcher.
     */
    public getEventDispatcher(): EventDispatcher {
        return this.eventDispatcher === null ? null : this.eventDispatcher.get();
    }
    
    /**
     * Sets the value of the property eventDispatcher.
     */
    public setEventDispatcher​(value: EventDispatcher): void {
        this.eventDispatcherProperty().set(value);
    }    

    /**
     * Specifies the event dispatcher for this node.
     */    
    public eventDispatcherProperty(): ObjectProperty<EventDispatcher> {
        if (this.eventDispatcher === null) {
            this.eventDispatcher = new SimpleObjectProperty<EventDispatcher>(null, this);
        }
        return this.eventDispatcher;
    }    

    public buildEventDispatchChain​(tail: EventDispatchChain): EventDispatchChain {
        let o = FXCollections.observableMap(null);
        throw new Error();
    }
    
    /**
     * The id of this Node.
     */    
    public idProperty(): StringProperty {
        if (this.id === null) {
            this.id = new SimpleStringProperty(null, this);
            this.id.addListener((observable: ObservableValue<string>, oldValue: string, newValue: string) => {
                $(this.getElement()).attr("id", newValue);
            });
        }
        return this.id;
    }

    /**
     * Sets the value of the property id.
     */    
    public setId​(value: string): void {
        this.idProperty().set(value);
    }

    /**
     * The id of this Node.
     */    
    public getId(): string {
        return this.id === null ? null : this.id.get();
    }

    /**
     * A string representation of the CSS style associated with this specific Node. 
     * This is analogous to the "style" attribute of an HTML element. Note that, like the HTML 
     * style attribute, this variable contains style properties and values and not the selector 
     * portion of a style rule.
     */    
    public styleProperty(): StringProperty {
        if (this.style === null) {
            this.style = new SimpleStringProperty(null, this);
            this.style.addListener((observable: ObservableValue<string>, oldValue: string, newValue: string) => {
                $(this.getElement()).attr("style", newValue);
            });
        }
        return this.style;
    }
    
    /**
     *  A string representation of the CSS style associated with this specific Node.
     */
    public getStyle(): string {
        return this.style === null ? null : this.style.get();
    }

    /**
     * A string representation of the CSS style associated with this specific Node.
     */    
    public setStyle​(value: string): void {
        this.styleProperty().set(value);
    }

    /**
     * Defines a function to be called when this Node or its child Node has input focus and a key has been pressed.
     */    
    public onKeyPressedProperty(): ObjectProperty<EventHandler<KeyEvent>> {
        if (this.onKeyPressed === null) {
            this.onKeyPressed = this.eventHandlerManager.createOnKeyPressed();
        }
        return this.onKeyPressed;
    }

    /**
     * Gets the value of the property onKeyPressed.
     */    
    public getOnKeyPressed(): EventHandler<KeyEvent> {
        return this.onKeyPressed === null ? null : this.onKeyPressed.get();
    }

    /**
     * Sets the value of the property onKeyPressed.
     */
    public setOnKeyPressed​(value: EventHandler<KeyEvent>): void {
        this.onKeyPressedProperty().set(value);
    }

    /**
     * Defines a function to be called when this Node or its child Node has input focus and a key has been released.
     */
    public onKeyReleasedProperty(): ObjectProperty<EventHandler<KeyEvent>> {
        if (this.onKeyReleased === null) {
            this.onKeyReleased = this.eventHandlerManager.createOnKeyReleased();
        }
        return this.onKeyReleased;
    }

    /**
     * Gets the value of the property onKeyReleased.
     */    
    public getOnKeyReleased(): EventHandler<KeyEvent> {
        return this.onKeyReleased === null ? null : this.onKeyReleased.get();
    }

    /**
     * Sets the value of the property onKeyReleased.
     */
    public setOnKeyReleased(value: EventHandler<KeyEvent>): void {
        this.onKeyReleasedProperty().set(value);
    }

    /**
     * Defines a function to be called when this Node or its child Node has input focus and a key has been typed.
     */
    public onKeyTypedProperty(): ObjectProperty<EventHandler<KeyEvent>> {
        if (this.onKeyTyped === null) {
            this.onKeyTyped = this.eventHandlerManager.createOnKeyTyped();
        }
        return this.onKeyTyped;
    }

    /**
     * Gets the value of the property onKeyTyped.
     */    
    public getOnKeyTyped(): EventHandler<KeyEvent> {
        return this.onKeyTyped === null ? null : this.onKeyTyped.get();
    }

    /**
     * Sets the value of the property onKeyTyped.
     */
    public setOnKeyTyped​(value: EventHandler<KeyEvent>): void {
        this.onKeyTypedProperty().set(value);
    }
    
    /**
     * Registers an event handler to this node.
     */
    public addEventHandler<T extends Event>​(eventType: EventType<T>, eventHandler: EventHandler<T>): void {
        this.eventHandlerManager.addMultipleEventHandlerByType(eventType, eventHandler);
    }

    /**
     * Unregisters a previously registered event handler from this node.
     */    
    public removeEventHandler​<T extends Event>(eventType: EventType<T>, eventHandler: EventHandler<T>): void {
        this.eventHandlerManager.removeMultipleEventHandlerByType(eventType, eventHandler);
    }

    protected abstract createElement(): HTMLElement;
    
    /**
     * This method is private, but is used in Parent/Scene, as there is no package access in TS.
     */
    private setParent(value: Parent): void {
        this.parent.set(value);
    }
    
    /**
     * This method is private, but it is used in Parent/Scene, as there is no package access in TS.
     */
    private setScene(scene: Scene): void {
        this.scene.set(scene);
    }
    
    /**
     * This method is private, but it is used in Parent/Scene, as there is no package access in TS.
     */
     private getEventHandlerManager(): NodeEventHandlerManager {
         return this.eventHandlerManager;
     }
     
    /**
     * This method is private, but it is used in Parent/Scene, as there is no package access in TS.
     * Traverses down Node tree and calls consume function. This method is in Node but not in Parent
     * because lookup method is also in Node.
     */
    private traverse(consumer: Consumer<Node>) {
        consumer(this);
        if (this instanceof Parent) {
            const children: ObservableList<Node> = (<any>this).getChildren();
            const iterator: Iterator<Node> = children.iterator();
            while (iterator.hasNext()) {
                iterator.next().traverse(consumer);
            }
        }
    }
}