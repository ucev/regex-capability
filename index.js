function log(name, succ) {
    if (succ) {
        console.log(`支 持 - ${name}`);
    } else {
        console.error(`不支持 - ${name}`)
    }
}

function test(name, reg, ...text) {
    let succ = text.every(t => reg.test(t));
    log(name, succ);
}
function testNeg(name, reg, ...text) {
    let succ = text.every(t => !reg.test(t));
    log(name, succ);
}
testNeg('单词分界符\\b', /\ba\b/, 'bac');
test('点号.匹配换行符', /^.*$/, 'a\nb');
test('多行模式下点号.匹配换行符', /^.*$/m, 'a\nb');
test('行开始锚点^支持\\n', /^c/, 'ab\ncd');
test('行结束锚点$支持\\n', /^b/, 'ab\ncd');
test('多行模式下行开始锚点^支持\\n', /^c/m, 'ab\ncd');
test('多行模式下行结束锚点$支持\\n', /b$/m, 'ab\ncd');
test('\\w支持汉字', /\w/, '正');
test('unicode模式下\\w支持汉字', /\w/u, '正');
test('Unicode属性类', /\p{Number}/u, '123');
log('字符组减法', !/[[a-z]-[aeiou]]/.test('a') && /[[a-z]-[aeiou]]/.test('b'));
log('字符组集合运算', !/[[a-z]&&[^aeiou]]/.test('a') && /[[a-z]&&[^aeiou]]/.test('b'));
test('POSIX字符组方括号表示法', /[:alnum:]+/, '1b');
// collating序列
// 字符等价类
log('可选分支忽略优先', /a|a\sb/.exec('a b')[0] === 'a');
test('反向引用', /(\w+)\s\1/, 'ab ab');
test('命名分组反向引用', /(?<g>ab)\s\k<g>/, 'ab ab');
test('反向引用支持忽略大小写模式', /(\w+)\s+\1/i, 'ab Ab');
test('后行断言', /(?<=a)b/, 'ab');
test('后行断言可变长', /(?<=a+)b/, 'aab');
test('后行断言可选分支', /(?<=a|b)c/, 'ac', 'bc');
testNeg('后行否定断言', /(?<!a)b/, 'ab');
testNeg('后行否定断言可变长', /(?<!a+)b/, 'aab');
testNeg('后行否定断言可选分支', /(?<!a|b)c/, 'ac', 'bc');
test('先行断言', /b(?=a)/, 'ba');
test('先行断言可变长', /b(?=a+)/, 'baa');
test('先行断言可选分支', /c(?=a|b)/, 'ca', 'cb');
testNeg('先行否定断言', /b(?!a)/, 'ba');
testNeg('先行否定断言可变长', /b(?!a+)/, 'baa');
testNeg('先行否定断言可选分支', /c(?!a|b)/, 'ca', 'cb');
try {
    testNeg('固化分组', /^(?>.*)!$)/, 'abcd!');
} catch (err) {
    log('固化分组', false);
}
try {
    testNeg('占有优先', /^.*+!$)/, 'abcd!');
} catch (err) {
    log('占有优先', false);
}