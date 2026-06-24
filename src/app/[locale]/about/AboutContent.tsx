'use client';

interface AboutMessages {
  standards: string;
  standard1: string;
  standard2: string;
  publishedBy: string;
  association1: string;
  association2: string;
  contact: string;
  contactEmail: string;
  supportedBy: string;
  support1: string;
  support2: string;
  copyright: string;
}

export default function AboutContent({ messages: m }: { messages: AboutMessages }) {
  return (
    <div className="max-w-[1280px] mx-auto px-6 md:px-12 py-8">
      {/* Hero */}
      <div className="mb-16">
        <div className="mono-label text-[12px] text-accent mb-3">
          ABOUT
        </div>
        <h1 className="display-title text-[clamp(2rem,5vw,4.75rem)] mb-6 max-w-3xl">
          关于标准
        </h1>
        <p className="text-[16px] text-text-secondary max-w-2xl leading-relaxed">
          了解中国马拉松医疗保障首批行业标准的制定背景、核心内容和行业意义。
        </p>
      </div>

      {/* Two standards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
        {/* Standard 1 */}
        <div className="rounded-feature border border-border p-8 bg-canvas-black">
          <div className="mono-label text-[11px] text-accent mb-4">
            STANDARD 01
          </div>
          <h2 className="font-sans font-bold text-[24px] text-text-primary mb-4">
            T/CADERM 8001-2021
          </h2>
          <h3 className="text-[18px] text-muted-text mb-6">
            马拉松赛事现场医疗保障 人员配置要求
          </h3>
          <p className="text-[14px] text-text-secondary leading-relaxed mb-6">
            本标准规定了马拉松赛事现场医疗保障的人员配置要求，包括医疗指挥中心人员、现场急救人员、救护车医护人员、医疗站医护人员的构成、职责、能力和最低数量。
          </p>
          <ul className="space-y-2 mb-6">
            <li className="text-[13px] text-muted-text flex items-start gap-2">
              <span className="text-accent mt-1">•</span>
              明确首席医疗官须具备相应赛事医疗保障经验
            </li>
            <li className="text-[13px] text-muted-text flex items-start gap-2">
              <span className="text-accent mt-1">•</span>
              要求现场急救人员通过能力考核
            </li>
            <li className="text-[13px] text-muted-text flex items-start gap-2">
              <span className="text-accent mt-1">•</span>
              规定救护车调度员须具备调度经验
            </li>
            <li className="text-[13px] text-muted-text flex items-start gap-2">
              <span className="text-accent mt-1">•</span>
              要求通信保障人员熟悉无线电紧急通信技能
            </li>
          </ul>
          <div className="pill-tag pill-tag--mint">人员配置</div>
        </div>

        {/* Standard 2 */}
        <div className="rounded-feature border border-border p-8 bg-canvas-black">
          <div className="mono-label text-[11px] text-verge-ultraviolet mb-4">
            STANDARD 02
          </div>
          <h2 className="font-sans font-bold text-[24px] text-text-primary mb-4">
            T/CADERM 8002-2021
          </h2>
          <h3 className="text-[18px] text-muted-text mb-6">
            马拉松赛事现场医疗保障 设施设备配置要求
          </h3>
          <p className="text-[14px] text-text-secondary leading-relaxed mb-6">
            本标准规定了马拉松赛事现场医疗保障的设施设备配置要求，包括医疗指挥中心、AED、救护车、医疗站、通信设备、物资和场地面积等配置要求。
          </p>
          <ul className="space-y-2 mb-6">
            <li className="text-[13px] text-muted-text flex items-start gap-2">
              <span className="text-verge-ultraviolet mt-1">•</span>
              全程马拉松AED最低配置30-60台（约0.7-1.4km/台）
            </li>
            <li className="text-[13px] text-muted-text flex items-start gap-2">
              <span className="text-verge-ultraviolet mt-1">•</span>
              半程马拉松AED最低配置15-30台
            </li>
            <li className="text-[13px] text-muted-text flex items-start gap-2">
              <span className="text-verge-ultraviolet mt-1">•</span>
              AED须由现场急救人员随身携带
            </li>
            <li className="text-[13px] text-muted-text flex items-start gap-2">
              <span className="text-verge-ultraviolet mt-1">•</span>
              医疗站须配置无线电台与指挥中心通信
            </li>
          </ul>
          <div className="pill-tag pill-tag--purple">设施配置</div>
        </div>
      </div>

      {/* Timeline */}
      <div className="mb-16">
        <h2 className="mono-label text-[12px] text-accent mb-8">
          标准制定历程
        </h2>
        <div className="relative pl-8 border-l border-purple-rule space-y-8">
          <div>
            <div className="mono-label text-[11px] text-accent mb-1">
              2021.05
            </div>
            <h3 className="text-[18px] font-bold text-text-primary mb-2">
              白银越野跑事件
            </h3>
            <p className="text-[14px] text-text-secondary">
              甘肃白银百公里越野赛发生公共安全责任事件，赛事医疗保障机制缺失成为重要原因，引发行业深刻反思。
            </p>
          </div>
          <div>
            <div className="mono-label text-[11px] text-accent mb-1">
              2021.06 - 2021.11
            </div>
            <h3 className="text-[18px] font-bold text-text-primary mb-2">
              标准起草
            </h3>
            <p className="text-[14px] text-text-secondary">
              中国医学救援协会与中国田径协会联合成立专家组，38位跨地区、跨行业专家共同起草标准。
            </p>
          </div>
          <div>
            <div className="mono-label text-[11px] text-accent mb-1">
              2021.12.15
            </div>
            <h3 className="text-[18px] font-bold text-text-primary mb-2">
              标准发布
            </h3>
            <p className="text-[14px] text-text-secondary">
              在北京召开"中国马拉松赛事医疗保障"标准发布会暨专家论坛，首批两项标准正式发布。
            </p>
          </div>
          <div>
            <div className="mono-label text-[11px] text-accent mb-1">
              2026.03.23
            </div>
            <h3 className="text-[18px] font-bold text-text-primary mb-2">
              行业研讨会
            </h3>
            <p className="text-[14px] text-text-secondary">
              在绍兴举办标准解读及实施经验分享交流行业座谈会，推动标准落地与迭代。
            </p>
          </div>
        </div>
      </div>

      {/* Key experts */}
      <div className="mb-16">
        <h2 className="mono-label text-[12px] text-accent mb-8">
          核心专家
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {[
            { name: '李宗浩', role: '专家组组长', org: '中国医学救援协会原会长' },
            { name: '陆乐', role: '专家组召集人', org: '第一反应创始人' },
            { name: '蔡文伟', role: '起草专家', org: '浙江省急救指挥中心副主任' },
            { name: '廖育鲲', role: '起草专家', org: '世界田联REMC医疗官' },
            { name: '张昱', role: '起草专家', org: '新中体育集团医疗安全部总监' },
            { name: '陆一鸣', role: '起草专家', org: '上海瑞金医院' },
          ].map((expert) => (
            <div
              key={expert.name}
              className="rounded-card border border-border p-6 bg-canvas-black"
            >
              <div className="img-placeholder rounded-round w-16 h-16 mb-4 text-[10px] flex items-center justify-center">
                {expert.name[0]}
              </div>
              <h3 className="font-sans font-bold text-[18px] text-text-primary mb-1">
                {expert.name}
              </h3>
              <p className="mono-label text-[10px] text-accent mb-2">
                {expert.role}
              </p>
              <p className="text-[13px] text-text-secondary">
                {expert.org}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* Contact */}
      <div className="rounded-feature border border-jelly-mint/30 p-8 md:p-12 text-center">
        <h2 className="display-hero text-[clamp(1.5rem,3vw,3.063rem)] text-accent mb-4">
          联系我们
        </h2>
        <p className="text-[16px] text-text-secondary mb-6">
          如您对标准的内容和实施，以及马拉松医疗保障有相关问题和意见，欢迎致信
        </p>
        <a
          href="mailto:Liaoyukun@sos919.com.cn"
          className="btn-outline text-[14px]"
        >
          Liaoyukun@sos919.com.cn
        </a>
      </div>
    </div>
  );
}
