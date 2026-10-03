import { journalMarkdown, dailyMarkdown } from './generated-content';
export type Category = '博客' | 'Java' | 'AI';
export interface ArticleSource {
  id?: string;
  type: string;
  title: string;
  desc: string;
  category: Category;
  date?: string;
  time: string;
  body: string[];
  publishedAt?: string;
  updatedAt?: string;
  topic?: string | null;
  issue?: string;
  advanced?: boolean;
}
export interface Article extends ArticleSource {
  id: string;
  publishedAt: string;
  updatedAt: string;
  markdown?: string;
  sections: { id: string; heading: string; text: string }[];
}
export interface DailyIssue {
  date: string;
  title: string;
  summary: string;
  articleIds: string[];
  supplied?: boolean;
}
const originalArticles: ArticleSource[] = [
  {
    type: '随笔',
    title: '保持好奇，比找到答案更重要',
    desc: '写代码、读书、散步。那些看似无关的事，最终都连接在一起。',
    date: '09.28',
    time: '6 分钟',
    category: '博客',
    body: [
      '刚开始写代码时，我以为成长意味着知道更多答案。后来才发现，更有价值的是不断提出新的问题。',
      '读一本技术之外的书，去一条没有走过的街道，认真听别人讲自己的工作。这些经历并不会立刻变成代码，却会慢慢改变我们理解问题的方式。',
      '这个博客用来记录这些连接：工程实践里的一点发现，读书时的一段思考，还有那些暂时没有答案的问题。保持好奇，也给思考留一点空白。',
    ],
  },
  {
    type: '工程实践',
    title: '从「能用」到「好用」：一次 API 重构',
    desc: '关于边界、命名，以及让下一位维护者少猜一点。',
    date: '09.21',
    time: '8 分钟',
    category: '博客',
    body: [
      '一个好用的 API，应当让调用者知道自己在做什么。重构之前，我先把所有调用场景列出来，再找出真正稳定的边界。',
      '统一错误结构，把隐含约定变成明确的参数，避免让一个方法承担多个意图。这些改变比增加更多抽象更有帮助。',
      '重构之后，我们用原有集成测试验证兼容性，并为失败路径补上检查。清晰的边界让以后修改实现时更有把握。',
    ],
  },
  {
    type: '读书笔记',
    title: '慢下来，才看得见系统的全貌',
    desc: '从《思考，快与慢》聊到软件设计中的直觉与判断。',
    date: '09.14',
    time: '5 分钟',
    category: '博客',
    body: [
      '直觉能帮助我们快速行动，但复杂系统经常要求我们停下来核实。',
      '在设计服务之前，画出数据如何流动，列出失败可能发生在哪里，再检查自己的假设。慢一点不是拖延，而是减少后面的返工。',
    ],
  },
  {
    type: 'Java 基础',
    title: 'HashMap 如何把一个 key 放到正确的位置？',
    desc: '从 hash 扰动、桶定位，到冲突处理与扩容。',
    date: '知识笔记',
    time: '12 分钟',
    category: 'Java',
    body: [
      'HashMap 通过 key 的 hashCode 计算散列值，再根据数组长度确定桶的位置。Java 8 的常见实现会把高位信息混入低位，帮助分散桶的分布。',
      '发生碰撞时，多个条目会落到同一个桶中。实现会使用链表，并在满足条件时转成红黑树。树化也依赖数组容量，因此不能只记住链表长度阈值。',
      '面试时建议按 put 的完整流程说明：计算 hash、定位桶、检查已有 key、插入条目，最后判断是否需要扩容。HashMap 不保证线程安全。',
    ],
  },
  {
    type: '并发编程',
    title: 'volatile 与 synchronized 的边界',
    desc: '可见性、有序性与原子性，分别解决什么问题。',
    date: '面试专题',
    time: '10 分钟',
    category: 'Java',
    body: [
      'volatile 让对变量的写入对后续读取可见，并为相关操作建立有序性约束。但它不会让复合操作自动具备原子性，例如 count++。',
      'synchronized 通过互斥访问保护临界区，并在释放与获取同一监视器之间提供可见性保证。',
      '选择时先问：是否只需发布一个状态，还是需要保护多个操作共同维持的不变量？后者往往需要锁或合适的原子操作。',
    ],
  },
  {
    type: 'JVM',
    title: '一次请求，如何走过 JVM 的内存区域',
    desc: '用一个方法调用理解栈帧、堆和对象的生命周期。',
    date: '知识笔记',
    time: '9 分钟',
    category: 'Java',
    body: [
      '方法调用会在当前线程的虚拟机栈中建立栈帧，保存局部变量、操作数栈等信息。对象通常分配在堆上，具体分配与优化取决于 JVM 实现。',
      '排查问题时要区分线程栈耗尽与堆空间不足。分析 GC 日志和内存快照之前，先明确症状以及发生的时间。',
    ],
  },
  {
    type: '模型与研究',
    title: '理解多模态：从看见到理解',
    desc: '今天的阅读主题：模型如何连接文字、图像与声音。',
    date: '演示日报',
    time: '4 分钟',
    category: 'AI',
    body: [
      '这是 UI 演示内容，并非今日实时新闻。',
      '本期阅读方向是多模态模型：文字、图像和声音如何被映射到模型可以处理的表示，以及不同输入如何参与推理。',
      '阅读相关研究时，可以关注评测任务、输入限制和失败案例，而不只关注榜单排名。',
    ],
  },
  {
    type: '开发者工具',
    title: '把 AI 放进工作流，而不只是聊天框',
    desc: '从代码审阅到知识检索，寻找真正有用的连接。',
    date: '演示日报',
    time: '5 分钟',
    category: 'AI',
    body: [
      '这是 UI 演示内容，并非今日实时新闻。',
      '尝试 AI 工具时，可以从边界明确、结果容易核验的任务开始，例如生成测试草稿或整理已有文档。',
      '把原始材料、期望结果和验收标准一起提供给工具，并保留人的审阅环节。',
    ],
  },
];

const extraArticles: ArticleSource[] = [
  {
    id: 'error-boundaries',
    category: '博客',
    type: '工程实践',
    title: '把失败路径也当作接口的一部分',
    desc: '超时、重试和错误返回，决定了系统在异常时是否仍然清楚。',
    publishedAt: '2026-09-07',
    time: '阅读笔记',
    body: [
      '设计接口时，成功返回通常最先得到关注。真正影响使用体验的，却常常是请求超时以后会发生什么。',
      '先区分调用方可以修正的输入错误与服务暂时无法处理的问题，再定义清晰的错误结构。重试需要考虑幂等性和退避，否则可能把局部故障放大。',
      '每一种失败都应有可以观察的信号。日志、指标和请求标识一起，才能帮助下一位维护者还原现场。',
    ],
  },
  {
    id: 'reading-source',
    category: '博客',
    type: '工程实践',
    title: '读源码之前，先带上一个问题',
    desc: '从一个具体调用出发，比从第一页读到最后一页更有效。',
    publishedAt: '2026-08-30',
    time: '阅读笔记',
    body: [
      '我读源码的起点通常是一个具体问题：这个对象什么时候创建，这个配置在哪里生效，或者这次调用为什么会阻塞。',
      '沿着调用链建立一张小地图，把核心路径与边界分支分开。先用最小示例验证判断，再补上实现细节。',
      '阅读的产出可以只是一张图和一段说明。能用自己的话解释一个行为，往往比记住更多类名更有价值。',
    ],
  },
  {
    id: 'notes-that-last',
    category: '博客',
    type: '随笔',
    title: '给未来的自己，写一份能读懂的笔记',
    desc: '留下问题、上下文和取舍，而不只是最终答案。',
    publishedAt: '2026-08-23',
    time: '阅读笔记',
    body: [
      '几个月之后，再看当时写下的结论，我常常已经忘记问题为什么出现。于是开始在笔记里多留一段上下文。',
      '记录目标是什么，试过什么，哪些限制影响了选择。这样，笔记就不只是答案仓库，也是判断过程的记录。',
      '写完之后问自己：一个没有参与这件事的人，能否靠这些文字继续工作？这也是检验笔记的好方法。',
    ],
  },
  {
    id: 'walk-and-think',
    category: '博客',
    type: '随笔',
    title: '有些问题，离开屏幕后才想明白',
    desc: '关于散步、停顿，以及给注意力留一点余地。',
    publishedAt: '2026-08-16',
    time: '阅读笔记',
    body: [
      '盯着同一段代码太久，容易把现有实现当成问题本身。离开屏幕一会儿，有时能重新看到真正的目标。',
      '散步没有神奇的效率承诺。它只是让我从细节里退一步，重新排列问题和假设。',
      '回到桌前时，把新的理解先写下来，再决定是否继续改代码。停顿也是工作的一部分。',
    ],
  },
  {
    id: 'book-and-system',
    category: '博客',
    type: '读书笔记',
    title: '从系统思维里，重新理解一个服务',
    desc: '关注反馈、边界和延迟，而不只关注单个组件。',
    publishedAt: '2026-08-09',
    time: '阅读笔记',
    body: [
      '一个服务的表现由很多连接共同决定。数据库响应、调用方重试和资源限制，会通过反馈影响彼此。',
      '在排查问题时，我尝试先画出边界和数据流，再识别哪些反馈可能放大变化。',
      '这份笔记记录一种观察方式：既看局部行为，也看它放进整个系统后的后果。',
    ],
  },
  {
    id: 'java-generics',
    category: 'Java',
    topic: 'basics',
    type: 'Java 基础',
    title: '泛型：把类型约束放到编译阶段',
    desc: '类型参数、擦除与通配符，分别在解决什么问题。',
    publishedAt: '2026-09-20',
    updatedAt: '2026-09-27',
    time: '知识笔记',
    body: [
      '泛型让类型参数成为类、接口和方法声明的一部分，使许多类型错误能在编译阶段被发现。',
      'Java 泛型通常通过类型擦除实现。编译器执行类型检查，并在需要的位置插入转换；因此不能把泛型类型参数当作可直接获取的运行时类型。',
      '读取为主的泛型容器常使用 extends 通配符，写入某种类型的容器常使用 super。理解读写限制，比只记住口诀更重要。',
    ],
  },
  {
    id: 'atomic-increment',
    category: 'Java',
    topic: 'concurrency',
    type: '面试专题',
    title: '为什么 volatile 不能保证自增的原子性？',
    desc: '把一次自增拆成读取、计算和写入，观察线程交错。',
    publishedAt: '2026-09-22',
    updatedAt: '2026-09-29',
    time: '面试笔记',
    body: [
      'count++ 看起来只有一条表达式，但它包含读取当前值、计算新值和写回等步骤。多个线程可能读取到相同的旧值。',
      'volatile 提供可见性和相关有序性保证，却不会把这些步骤合成一个不可分割的操作。',
      '可以用锁保护自增，或在适用时使用 AtomicInteger 等原子类。面试回答应结合共享状态与性能需求讨论选择。',
    ],
  },
  {
    id: 'ai-evaluation',
    category: 'AI',
    type: '评测与实践',
    title: '评测一个 AI 工具，先定义什么叫做好',
    desc: '从真实任务、失败案例和结果核验开始。',
    publishedAt: '2026-10-01',
    issue: '2026-10-01',
    time: '阅读笔记',
    body: [
      '这是设计示例，不是实时资讯。',
      '评价工具之前，先列出它要完成的任务，以及可以接受的结果。用自己常见的输入建立一组小规模案例。',
      '除了成功率，还应记录失败如何被发现、结果是否能解释，以及审阅需要多少额外工作。',
    ],
  },
];
extraArticles.push(
  {
    id: 'concurrency-backpressure',
    category: 'Java',
    topic: 'concurrency',
    advanced: true,
    type: '高并发',
    title: '高并发：先控制流量，再讨论扩容',
    desc: '从容量边界、限流与背压出发，理解系统如何面对突增的请求。',
    publishedAt: '2026-09-30',
    time: '进阶笔记',
    body: [
      '面对突增的流量，先判断瓶颈在哪里，以及系统能承受多少并行工作。增加线程或实例之前，需要观察数据库、外部依赖和资源池的容量边界。',
      '限流用于控制进入系统的请求，背压则让处理能力不足的信息向上游传递。队列可以缓冲短暂波动，但容量与等待时间都应有明确的边界。',
      '可以围绕稳定吞吐、响应延迟和错误率建立压测场景。扩容、降级或拒绝请求的选择，都应与业务优先级和故障恢复方式一起讨论。',
    ],
  },
  {
    id: 'distributed-idempotency',
    category: 'Java',
    topic: 'distributed',
    advanced: true,
    type: '分布式',
    title: '分布式系统：重试之后，如何避免重复执行？',
    desc: '把幂等性、去重与状态变化放进同一条请求链路。',
    publishedAt: '2026-09-26',
    time: '进阶笔记',
    body: [
      '一次请求超时，并不一定意味着操作没有发生。调用方重试之前，需要理解服务端是否已经产生了业务结果。',
      '可以使用业务唯一标识区分同一次操作的重复请求。去重记录与业务状态变化需要共同考虑，避免只保护了入口，却没有保护真正的副作用。',
      '重试策略还应定义次数、等待时间和失败后的处理方式。设计时要把并发重复请求、部分成功和服务恢复等情况一起纳入讨论。',
    ],
  },
  {
    id: 'performance-evidence',
    category: 'Java',
    topic: 'jvm',
    advanced: true,
    type: '性能调优',
    title: '性能调优：让证据决定优化方向',
    desc: '从延迟分布和资源观测开始，逐步验证性能假设。',
    publishedAt: '2026-09-24',
    time: '进阶笔记',
    body: [
      '优化之前，先明确目标：是减少请求延迟、提高吞吐，还是降低资源消耗？同一个改动可能改善一项指标，却牺牲另一项。',
      '结合负载、线程状态、CPU 和内存观测建立假设，再选择合适的分析工具。均值容易掩盖长尾，观察延迟分布有助于发现偶发的等待。',
      '每次只验证范围明确的改动，保留可对比的基线，并检查结果是否能够复现。性能调优的记录应包含测试条件与适用边界。',
    ],
  },
);
const slugs = [
  'stay-curious',
  'api-refactor',
  'slow-thinking',
  'hashmap',
  'volatile-synchronized',
  'jvm-memory',
  'multimodal',
  'ai-workflow',
];
const topics = [null, null, null, 'collections', 'concurrency', 'jvm', null, null];
const dates = [
  '2026-09-28',
  '2026-09-21',
  '2026-09-14',
  '2026-09-18',
  '2026-09-16',
  '2026-09-12',
  '2026-10-03',
  '2026-10-02',
];
const headings: Record<string, string[]> = {
  hashmap: ['散列与定位', '碰撞与树化', '面试中的回答顺序'],
  'volatile-synchronized': ['volatile 的保证', 'synchronized 的保证', '怎样选择'],
  'jvm-memory': ['栈帧与对象', '排查内存问题'],
  'java-generics': ['类型参数', '类型擦除', '通配符的边界'],
  'atomic-increment': ['拆开一次自增', '理解线程交错', '选择合适的实现'],
};
export const articles: Article[] = [
  ...originalArticles.map((a, i) => ({
    ...a,
    type: i === 3 ? '集合框架' : a.type,
    id: slugs[i],
    topic: topics[i],
    publishedAt: dates[i],
    updatedAt: dates[i],
    issue: i >= 6 ? dates[i] : undefined,
  })),
  ...extraArticles,
].map((a) => ({
  ...a,
  id: a.id!,
  publishedAt: a.publishedAt!,
  markdown: journalMarkdown[a.id!],
  updatedAt: a.updatedAt || a.publishedAt!,
  sections: a.body.map((text, i) => ({
    id: `section-${i + 1}`,
    heading: headings[a.id!]?.[i] || ['问题与背景', '理解与实践', '继续思考'][i] || '补充记录',
    text,
  })),
}));
export const javaTopics = [
  { id: 'basics', name: 'Java 基础', description: '语言特性、类型系统与泛型' },
  { id: 'collections', name: '集合框架', description: '数据结构、集合实现与使用边界' },
  { id: 'concurrency', name: '并发编程', description: '线程协作、内存模型与原子性' },
  { id: 'jvm', name: 'JVM', description: '内存区域、垃圾回收与问题排查' },
  { id: 'spring', name: 'Spring 生态', description: '容器、配置与应用实践' },
  { id: 'database', name: '数据库', description: '索引、事务与数据访问' },
  { id: 'distributed', name: '分布式系统', description: '幂等、重试与服务协作' },
];
export const issues: DailyIssue[] = Object.entries(dailyMarkdown)
  .map(([date, markdown]) => ({
    date,
    title: markdown.match(/^#\s+(.+)$/m)?.[1].trim() || '科技情报日报',
    summary: '从重大事件到产业动态、开发者关注与数据指标，八个栏目记录一天的科技与商业变化。',
    articleIds: [],
    supplied: true,
  }))
  .sort((a, b) => b.date.localeCompare(a.date));
export const HOME_LIMIT = 2;
export const BLOG_PAGE_SIZE = 4;
export function articleUrl(article: Pick<Article, 'id'>) {
  return `/articles/${article.id}`;
}
