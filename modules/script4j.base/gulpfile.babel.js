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

import {buildModule, cleanModule, testModule, buildTestModule, runModuleTests} from './../../scripts/gulptasks';
import gulp from 'gulp';

gulp.task('build-module', function() {
    return buildModule(__dirname, false);
});

gulp.task('clean-module', function(done) {
    cleanModule(__dirname);
    done();
});

//gulp.task('test-module', function() {
//    return testModule(__dirname);
//});

gulp.task('build-module-tests', function() {
    return buildModule(__dirname, true);
});

gulp.task('build-test-module', function() {
    return buildTestModule(__dirname);
});

gulp.task('run-tests', function() {
    return runModuleTests(__dirname);
});

gulp.task('test-module', gulp.series('build-module-tests', 'build-test-module', 'run-tests'));
