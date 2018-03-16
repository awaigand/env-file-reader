var envStringParse = require('.').parseString;
import test from 'ava';

const SIMPLE_FILE=`VAR1=test
VAR2=test2`;

const SIMPLE_RECURSIVE_FILE=`VAR1=rec
VAR2=$VAR1ursive`;

const MIXED_RECURSIVE_FILE=`VAR1=$VAR2ursive
VAR2=rec`;

const MULTIPART_VARIABLE_FILE=`VAR1=multi
VAR2=part
VAR3=variable
VAR4=$VAR1$VAR2$VAR3`;

const ALL_KINDS_OF_ALLOWED_NAMES=`_=test1
A=test2
a=test3
b_3=test4`;

const ALL_KINDS_OF_ALLOWED_NAMES_RECURSIVE=`_=re
A=cu
a=r
b_3=sive
__=$_$A$a$b_3`;

test('Base Test', async t => {
	var result = envStringParse(SIMPLE_FILE);
    t.is(result['VAR1'],'test');
    t.is(result['VAR2'],'test2');
})

test('Base Recursive Test', async t => {
	var result = envStringParse(SIMPLE_RECURSIVE_FILE);
    t.is(result['VAR1'],'rec');
    t.is(result['VAR2'],'recursive');
})

test('Mixed Recursive Test', async t => {
	var result = envStringParse(MIXED_RECURSIVE_FILE);
    t.is(result['VAR1'],'recursive');
    t.is(result['VAR2'],'rec');
})

test('Multipart Test', async t => {
	var result = envStringParse(MULTIPART_VARIABLE_FILE);
    t.is(result['VAR4'],'multipartvariable');
})

test('All Kinds Of Allowed Names', async t => {
	var result = envStringParse(ALL_KINDS_OF_ALLOWED_NAMES);
    t.is(result['_'],'test1');
    t.is(result['A'],'test2');
    t.is(result['a'],'test3');
    t.is(result['b_3'],'test4');
})

test('All Kinds Of Allowed Names Recursive', async t => {
	var result = envStringParse(ALL_KINDS_OF_ALLOWED_NAMES_RECURSIVE);
    t.is(result['__'],'recursive');
})

