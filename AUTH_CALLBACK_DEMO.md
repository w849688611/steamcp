# AuthCallback 组件使用说明

## 功能概述
`src/views/portal/AuthCallback.vue` 是一个专门处理第三方授权回调的中间页组件，支持三种状态：

## 使用场景

### 1. 静默登录（老用户返回）
**触发 URL:**
```
/auth/callback?action=login&token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
```

**表现:**
- 全屏优雅的 Loading 动画
- 显示"正在安全登入系统..."
- 自动将 token 存储到 localStorage
- 1 秒后跳转到首页 `/`

**业务逻辑:**
```typescript
localStorage.setItem('auth_token', token)
setTimeout(() => router.push('/'), 1000)
```

---

### 2. 账号绑定（新用户首次授权）⭐ 核心功能
**触发 URL:**
```
/auth/callback?action=bind&bindToken=temp_bind_xxx&provider=steam&nickname=Player001&avatar=https://example.com/avatar.jpg
```

**表现:**
- 居中展示玻璃拟物化表单卡片
- 顶部显示用户头像、昵称和授权成功提示
- 表单包含：
  - 邮箱输入框（Email）
  - 密码输入框（Password）
- 提交按钮："立即绑定并进入大厅"
- 底部安全提示（AES-256 加密说明）

**提交逻辑:**
```typescript
const payload = {
  bindToken: 'temp_bind_xxx',  // 从 URL 获取
  email: 'user@email.com',     // 用户输入
  password: 'password123',     // 用户输入
  deptId: 1001,                // Demo 固定值
  provider: 'steam'            // 从 URL 获取
}

// 调用后端绑定接口
fetch('/api/auth/bind', {
  method: 'POST',
  body: JSON.stringify(payload)
})
```

---

### 3. 错误异常
**触发 URL:**
```
/auth/callback?error=account_abnormal
/auth/callback?error=auth_expired
/auth/callback?error=system_error
```

**错误码映射:**
- `account_abnormal` → "账号状态异常，请联系客服处理"
- `auth_expired` → "授权已过期，请重新登录"
- `system_error` → "系统繁忙，请稍后重试"
- 其他 → "未知错误，请返回重试"

**表现:**
- 红色警告图标
- 显示友好的错误提示
- "返回登录页" 按钮

---

## 视觉设计特点

### 背景效果
- 四周微弱的蓝紫色渐变光晕（blur-3xl）
- 网格背景增强科技感
- 动态呼吸效果（animate-pulse）

### 表单卡片设计
- 玻璃拟物化：`bg-slate-900/60 backdrop-blur-md`
- 细边框：`border-slate-800`
- 输入框 Focus 外发光：`focus:ring-2 focus:ring-blue-500`

### 加载动画
- 外圈旋转光环（animate-spin）
- 内圈脉冲效果（animate-pulse）
- 三点跳跃指示器（staggered bounce）

---

## 本地测试方法

### 测试静默登录
```bash
# 打开浏览器访问
http://localhost:5173/auth/callback?action=login&token=demo_token_123
```

### 测试账号绑定
```bash
# 打开浏览器访问
http://localhost:5173/auth/callback?action=bind&bindToken=bind_123&provider=steam&nickname=测试玩家&avatar=https://picsum.photos/200
```

### 测试错误状态
```bash
# 打开浏览器访问
http://localhost:5173/auth/callback?error=account_abnormal
```

---

## 后端集成要点

### 绑定接口规范
```typescript
// POST /api/auth/bind
interface BindRequest {
  bindToken: string;  // 临时绑定凭证
  email: string;      // 用户输入的邮箱
  password: string;   // 用户输入的密码
  deptId: number;     // 部门ID（Demo固定1001）
  provider: string;   // 授权来源（steam/wechat）
}

interface BindResponse {
  success: boolean;
  token?: string;     // 绑定成功后的正式 token
  message?: string;
}
```

### 回调 URL 规范
后端在第三方授权完成后，应重定向到：
```
https://yourdomain.com/auth/callback?action=bind&bindToken={TOKEN}&provider={PROVIDER}&nickname={NAME}&avatar={AVATAR_URL}
```

---

## 技术栈
- Vue 3 Composition API
- TypeScript
- Vue Router
- Tailwind CSS（暗黑电竞风格）
- Lucide Icons

---

## 安全建议
1. bindToken 应设置短期有效期（建议 5 分钟）
2. 密码需在后端进行二次校验（长度、复杂度）
3. 邮箱需验证格式并检查重复
4. 绑定成功后立即清除 bindToken
5. 所有敏感操作需记录审计日志
