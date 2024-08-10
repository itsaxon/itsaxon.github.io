---
title: Java 基础
author: leo_shuo
createTime: 2024/08/10 16:53:07
permalink: /core/a7rc8cp9/
---
## JDK JRE JVM 的关系

JDK指Java开发工具包，它包含JRE，JRE是运行时环境，它包含JVM虚拟机，JVM虚拟机是整个JAVA的核心，JVM内部包含很多应用程序的类解释器以及类加载器

## Java的数据类型

基本数据类型

- 整数 byte short int long
- 浮点数 float double
- 字符 char
- 布尔 boolean

引用数据类型

- 类
- 数组
- 接口

## 基本数据类型的长度

- byte 1
- short 2
- int 4
- long 8
- float 4
- double 8
- char 2
- boolean 1

## switch支持的类型

- JDK1.5之前支持 byte、short、int、char
- JDK1.5之后支持 Integer、Enum
- JDK1.7之后支持 String

## static关键字的作用

- 修饰成员变量 成员方法的时候 无论创建多少对象 都只有一份 存在方法区 用类名调用
- 修饰静态代码块 无论创建多少对象 只会初始化一次 一般用来加载静态资源
- 作为静态导包 JDK1.5的功能

## final关键字的作用

- 修饰类 类不可被继承
- 修饰方法 方法不能被重写
- 修饰变量 变量的引用不可改变

## final finally finalize的区别

- finally 用在try-catch代码中 表示无论是否发生异常 finally里的代码都会执行 通常用来存放关闭资源的代码
- finalize Object类的一个方法 由垃圾回收器调用 调用System.gc()方法 垃圾回收器会调用finalize方法 做一个将对象从内存中清除出去之前的清理工作

## == equals 的区别

对于基本数据类型以及String来说 == 比较的是值 对于引用数据类型来说 == 比较的是地址 equals默认比较的是地址 重写可以比较内容

## 值传递 引用传递 的区别

值传递 传的是一个值 相当于传了一个副本 形参和实参互不影响 引用传递 传的是一个引用地址 形参实参指向同一对象 形参的改变就是实参的改变

## 浅拷贝 深拷贝的区别

浅拷贝 对于基本数据类型来说是直接拷贝的值 对于引用数据类型来说是拷贝的引用 但是不会拷贝对象 原始对象和副本都是指向同一个对象 深拷贝 对于基本数据类型来说是直接拷贝的值 对于引用数据类型来说是拷贝的引用和对象 指向的是一个新对象

## 什么是面向对象

面向对象是一种程序设计思想 是针对面向过程而言的 在程序设计过程中 参照现实中事物 将事物的属性 行为抽象出来 描述成计算机程序 这样一种方式就是面向对象

## 面向对象 面向过程的区别

面向过程主要是以实现功能的函数开发为主，面向对象需要抽象出类 属性 方法 实例化类 执行方法来完成功能，都具有封装性，面向过程封装的是功能，面向对象封装的是数据和功能，面向对象具有继承性和多态性，面向过程没有

## 面向对象的特征

- 封装 对程序代码的一种保护 可以隐藏类的实现细节 对外提供公共的访问方式 提高代码安全性
- 继承 让类与类之间产生关系 子类继承父类 可以使用父类的属性方法 提高代码的复用性
- 多态 一个类具有多种不同的表现形态 前提要有父类的引用指向子类的实例 提高代码的拓展性

## 创建对象的方式

- new
- Object类 clone
- 反序列化
- Class类 newInstance

## String类常用的方法

- equals
- indexOf
- substring
- startsWith
- split

## String StringBuffer StringBuilder 的区别

- String是不可变的 使用被final修饰的字符数组存储数据  StringBuffer StringBuilder继承AbstractStringBuilder使用的是字符数组 是可变的
- String被final修饰 线程安全 StringBuffer在方法上加了同步锁 线程安全 StringBuilder不安全
- 修改String 返回的是新的String对象 性能低 StringBuffer StringBuilder 返回的是本身 性能高

## 什么是 装箱 拆箱

装箱 基本数据类型转换为对应的包装类型 拆箱 基本类型对应的包装类型转换为基本类型 JDK1.5之后自动装箱拆箱

## 运行时异常 与 编译时异常 的区别

运行时异常是编译器不强制处理的异常 出现在程序运行的时候 都是RuntimeException异常 编译时异常是编译器强制要求处理的异常 不处理代码无法编译 都是RuntimeException以外的异常

## 常见运行时异常

- NullPointException
- ArrayIndexOutOfBoundsException
- IndexOutOfBoundsException
- NumberFormatException
- ArrayStoreException

## 常见编译时异常

- SQLException
- ClassNotFoundException
- FileNotFoundException
- ParseException
- IOException

## 什么是反射

把Java类中的各个成分映射为一个个的Java对象，这个过程称为反射机制

## 反射的原理

任何一个编译过的class文件在被类加载器加载后 都会有一个Class类实例 通过获取这个类的class字节码对象 就可以获取这个类的实例 属性 方法等 也可以通过getset方法获取变量的值

## 抽象类与接口的区别

- 抽象类是abstract 接口是interface
- 抽象类里有成员变量 成员方法 抽象方法 接口里有常量 抽象方法
- 抽象类里成员变量的定义和普通类一样 接口会加上public static final 变成常量
- 抽象类遵循的是is a的设计原则 接口是has a
- 抽象类一般充当公共类的角色 不适用于修改维护 接口用于实现常用的功能 适用于修改维护
- 接口比抽象类更为抽象

## 元注解分类

- Retention
- Target
- Document
- Inherited

## 长连接与短连接的区别

长连接是在一个连接上可以连续发送多个数据包 在连接期间 如果没有数据包发送需要双方发链路检测包 短连接是通讯双方有数据交互时 就建立一个连接 数据发送完成 断开连接

## int 为什么是四个字节

一个字节是计算机存储数据的基本单位。它等于8个比特（bit），每个比特只能为0或1。因此，一个字节可以用二进制表示为8个位（位=比特）。例如，以下是一个字节的二进制表示：01010110。

首先 Java 中的 int 类型占用4个字节是由 Java 语言规范所决定的。这样做是为了确保 Java 程序在不同平台上的兼容性，为了保证Java程序在不同操作系统上都能正确地运行，并提高内存利用率。在32位操作系统中，int 占4个字节，64位则是8个字节。因为32位系统和64位系统使用的CPU架构不同。32位系统使用32位寻址，即内存地址被限制在32位范围内。因此，32位系统最多只能寻址2^32个字节（4GB）。而一个32位的 int 数据类型正好占用4个字节，可以轻松地在32位系统中存储和处理。对于64位系统，使用64位架构，所以CPU可以处理更大的数据。因此，int 数据类型被定义为8个字节，可以存储更大范围的整数。