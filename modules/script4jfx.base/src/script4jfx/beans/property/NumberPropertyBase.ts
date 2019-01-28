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

import { NumberProperty } from './NumberProperty';
import { ObservableValue } from './../value/ObservableValue';
import { ChangeListener } from "./../value/ChangeListener";
import { PropertyDelegate } from './../../internal/beans/property/PropertyDelegate';

export abstract class NumberPropertyBase extends NumberProperty {

    private delegate: PropertyDelegate<number>;

    constructor() {
        super();
        this.delegate = PropertyDelegate.newInstance<number>(this);
    }

    public bind(observable: ObservableValue<number>): void {
        PropertyDelegate.bind(this.delegate, observable);
    }

    public isBound(): boolean {
        return PropertyDelegate.isBound(this.delegate);
    }

    public unbind(): void {
        PropertyDelegate.unbind(this.delegate);
    }

    public addListener(listener: ChangeListener<number>): void {
        PropertyDelegate.addListener(this.delegate, listener);
    }

    public removeListener(listener: ChangeListener<number>): void {
        PropertyDelegate.removeListener(this.delegate, listener);
    }

    public get(): number {
        return PropertyDelegate.get(this.delegate);
    }

    public set(value: number) {
        PropertyDelegate.set(this.delegate, value);
    }

    protected fireValueChangedEvent(): void {
        PropertyDelegate.fireValueChangedEvent(this.delegate);
    }
}

