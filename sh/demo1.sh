#!/bin/bash

# echo 打印
echo "Hello World!"

# 变量
MY_NAME="John"
echo "My name is $MY_NAME"

echo $USER
# 条件判断
if [ $USER = 'root' ]; then
    echo "Hello root"
else
    echo "Hello $USER"
fi

# 循环
for i in 1 2 3 4 5; do
    echo $i
done

# 函数
function hello() {
    echo "Hello $1"
}
hello "John"

# 数组
array=(1 2 3 4 5)
echo ${array[0]}

# 读取键盘输入
echo "Please input your name:"
read name
echo "Hello $name"

# 读取文件
cat demo1.sh

# 重定向
echo "Hello World!" > test.txt
cat test.txt

# 追加
echo "Hello World!" >> test.txt
cat test.txt

# 读取命令输出
echo `date`

# 读取命令输出
echo $(date)

# 读取命令输出
date

# 读取命令输出
date | cat

# 读取命令输出
date | cat > test.txt

set -e  # 如果命令执行失败，就退出脚本

# 字符串操作
echo "Hello, World!" | cut -d" " -f1  # Hello # 以空格分割，取第一个

sh -c "$(wget -O- https://raw.githubusercontent.com/ohmyzsh/ohmyzsh/master/tools/install.sh)"



