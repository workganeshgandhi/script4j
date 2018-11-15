/*
 * Copyright (c) 2018 Pavel Kastornyy. All rights reserved.
 *
 * DO NOT ALTER OR REMOVE COPYRIGHT NOTICES OR THIS FILE HEADER.
 *
 * This code is free software; you can redistribute it and/or modify it
 * under the terms of the GNU General Public License version 2 only, as
 * published by the Free Software Foundation.
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

import { assert } from 'chai';
import 'mocha';
import {ArrayList} from './../../../src/script4j/util/ArrayList';
import {List} from './../../../src/script4j/util/List';
import {Iterator} from './../../../src/script4j/util/Iterator';
import {IndexOutOfBoundsError} from './../../../src/script4j/lang/IndexOutOfBoundsError';
import {NoSuchElementError} from './../../../src/script4j/util/NoSuchElementError';
import {IllegalStateError} from './../../../src/script4j/lang/IllegalStateError';

describe('ArrayListTest', () => {

    let obj1: Object = new Object();
    let obj2: Object = new Object();
    let obj3: Object = new Object();

    it('add_objects_addsObject', () => {
        let list: List<Object> = new ArrayList();
        list.add(obj1);
        assert.equal(list.size(), 1);
        assert.isTrue(list.get(0).equals(obj1));
        list.add(obj2);
        assert.equal(list.size(), 2);
        assert.isTrue(list.get(0).equals(obj1));
        assert.isTrue(list.get(1).equals(obj2));
    });

    it('clear_clearsArray_emptyArray', () => {
        let list: List<Object> = new ArrayList();
        assert.equal(list.size(), 0);
        list.add(obj1);
        assert.equal(list.size(), 1);
        list.clear();
        assert.equal(list.size(), 0);
    });

    it('contains_differentObjects_checks', () => {
        let list: List<Object> = new ArrayList();
        assert.equal(list.contains(obj1), false);
        list.add(obj1);
        assert.equal(list.contains(obj1), true);
        assert.equal(list.contains(obj2), false);
        list.add(obj2);
        assert.equal(list.contains(obj2), true);
        list.clear()
        assert.equal(list.contains(obj1), false);
        assert.equal(list.contains(obj2), false);
    });

    it('isEmpty_state_checks', () => {
        let list: List<Object> = new ArrayList();
        assert.equal(list.isEmpty(), true);
        list.add(obj1);
        assert.equal(list.isEmpty(), false);
        list.clear();
        assert.equal(list.isEmpty(), true);
    });

    it('remove_shiftingObjects_removesObjects', () => {
        let list: List<Object> = new ArrayList();
        list.add(obj1);
        list.add(obj2);
        list.add(obj3);
        list.remove(obj2);
        assert.equal(list.get(0).equals(obj1), true);
        assert.equal(list.get(1).equals(obj3), true);
        assert.equal(list.size(), 2);
        list.remove(obj3);
        assert.equal(list.get(0).equals(obj1), true);
        assert.equal(list.size(), 1);
    });

    it('addByIndex_shiftingObjects_addsObject', () => {
        let list: List<Object> = new ArrayList();
        list.add(obj1);
        list.addByIndex(0, obj2);
        assert.equal(list.get(0).equals(obj2), true);
        assert.equal(list.get(1).equals(obj1), true);
        assert.equal(list.size(), 2);
        list.addByIndex(1, obj3);
        assert.equal(list.get(0).equals(obj2), true);
        assert.equal(list.get(1).equals(obj3), true);
        assert.equal(list.get(2).equals(obj1), true);
        assert.equal(list.size(), 3);
    });

    it('get_outOfRange_IndexOutOfBoundsError', () => {
        let list: List<Object> = new ArrayList();
        assert.throws(() => list.get(0), IndexOutOfBoundsError);
        list.add(obj1);
        assert.throws(() => list.get(2), IndexOutOfBoundsError);
    });

    it('removeByIndex_shiftingObjects_removesObjects', () => {
        let list: List<Object> = new ArrayList();
        list.add(obj1);
        list.add(obj2);
        list.add(obj3);
        list.removeByIndex(1);
        assert.equal(list.get(0).equals(obj1), true);
        assert.equal(list.get(1).equals(obj3), true);
        assert.equal(list.size(), 2);
        list.removeByIndex(0);
        assert.equal(list.get(0).equals(obj3), true);
        assert.equal(list.size(), 1);
    });

    it('set_shiftingObjects_setsObjects', () => {
        let list: List<Object> = new ArrayList();
        list.add(obj1);
        list.set(0, obj2);
        assert.equal(list.get(0).equals(obj2), true);
        assert.equal(list.size(), 1);
        list.add(obj3);
        list.set(1, obj1);
        assert.equal(list.get(0).equals(obj2), true);
        assert.equal(list.get(1).equals(obj1), true);
        assert.equal(list.size(), 2);
    });

    it('indexOf_objectExists_findsIndex', () => {
        let list: List<Object> = new ArrayList();
        list.add(obj1);
        list.add(obj2);
        list.add(obj3);
        assert.equal(list.indexOf(obj1), 0);
        assert.equal(list.indexOf(obj2), 1);
        assert.equal(list.indexOf(obj3), 2);
    });

    it('indexOf_objectNotExists_returnsNotFound', () => {
        let list: List<Object> = new ArrayList();
        list.add(obj1);
        list.add(obj2);
        assert.equal(list.indexOf(obj3), -1);
    });

    it('iterator_hasNext_checks', () => {
        let list: List<Object> = new ArrayList();
        let iterator: Iterator<Object> = list.iterator();
        assert.equal(iterator.hasNext(), false);
        list.add(obj1);
        assert.equal(iterator.hasNext(), true);
        list.clear()
        assert.equal(iterator.hasNext(), false);
    });

    it('iterator_nextWithElement_returnsElement', () => {
        let list: List<Object> = new ArrayList();
        let iterator: Iterator<Object> = list.iterator();
        list.add(obj1);
        assert.equal(iterator.next().equals(obj1), true);
    });

    it('iterator_nextWithNoElement_NoSuchElementError', () => {
        let list: List<Object> = new ArrayList();
        let iterator: Iterator<Object> = list.iterator();
        assert.throws(() => iterator.next(), NoSuchElementError);
        list.add(obj1);
        assert.equal(iterator.next().equals(obj1), true);
        assert.throws(() => iterator.next(), NoSuchElementError);
    });

    it('iterator_removeAfterNext_removesElement', () => {
        let list: List<Object> = new ArrayList();
        let iterator: Iterator<Object> = list.iterator();
        list.add(obj1);
        iterator.next();
        iterator.remove();
        assert.equal(list.size(), 0);
    });

    it('iterator_removesCorrectElement_removesElement', () => {
        let list: List<Object> = new ArrayList();
        let iterator: Iterator<Object> = list.iterator();
        list.add(obj1);
        list.add(obj2);
        list.add(obj3);
        iterator.next();
        iterator.next();
        iterator.remove();
        assert.equal(list.size(), 2);
        assert.equal(list.get(0).equals(obj1), true);
        assert.equal(list.get(1).equals(obj3), true);
    });

    it('iterator_removeWithoutNext_IllegalStateError', () => {
        let list: List<Object> = new ArrayList();
        let iterator: Iterator<Object> = list.iterator();
        list.add(obj1);
        assert.throws(() => iterator.remove(), IllegalStateError);
    });

    it('forEach_severalObjects_callsConsumer', () => {
        let list: List<Object> = new ArrayList();
        list.add(obj1);
        list.add(obj2);
        let arr: Object[] = [];
        list.forEach((e: Object) => {
            arr.push(e);
        });
        assert.equal(list.get(0).equals(arr[0]), true);
        assert.equal(list.get(1).equals(arr[1]), true);
        assert.equal(arr.length, 2);
    });

});