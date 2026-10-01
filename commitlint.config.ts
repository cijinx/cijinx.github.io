import type { UserConfig } from "@commitlint/types";
import { RuleConfigSeverity } from "@commitlint/types";

const Configuration: UserConfig = {
  extends: ["@commitlint/config-conventional"],
  formatter: "@commitlint/format",
  rules: {
    "type-enum": [
      RuleConfigSeverity.Error,
      "always",
      [
        "build",
        "chore",
        "ci",
        "docs",
        "feat",
        "fix",
        "perf",
        "refactor",
        "revert",
        "style",
        "test",
      ],
    ],
  },
  prompt: {
    settings: {},
    messages: {
      skip: ":跳过",
      max: "超过 %d 字节",
      min: "至少 %d 个字符",
      emptyWarning: "不能为空",
      upperLimitWarning: "超过限制",
      lowerLimitWarning: "低于限制",
    },
    questions: {
      type: {
        description: "选择将要提交的类型:",
        enum: {
          feat: {
            description: "新增功能",
            title: "Features",
            emoji: "✨",
          },
          fix: {
            description: "修复 bug",
            title: "Bug Fixes",
            emoji: "🐛",
          },
          docs: {
            description: "仅仅是文档的变更",
            title: "Documentation",
            emoji: "📚",
          },
          style: {
            description: "不影响代码含义的变动(空格、格式化、缺少分号等)",
            title: "Styles",
            emoji: "💎",
          },
          refactor: {
            description: "不影响代码含义的变动(空格、格式化、缺少分号等)",
            title: "Code Refactoring",
            emoji: "📦",
          },
          perf: {
            description: "代码性能优化",
            title: "Performance Improvements",
            emoji: "🚀",
          },
          test: {
            description: "新增缺失的测试或修正现有的测试",
            title: "Tests",
            emoji: "🚨",
          },
          build: {
            description:
              "更改项目构建系统或外部依赖项(示例范围: gulp, broccoli, npm)",
            title: "Builds",
            emoji: "🛠",
          },
          ci: {
            description:
              "对 CI 配置文件和脚本的更改(示例范围: Travis, Circle, BrowserStack, SauceLabs)",
            title: "Continuous Integrations",
            emoji: "⚙️",
          },
          chore: {
            description: "其他不修改 src 或测试文件的更改",
            title: "Chores",
            emoji: "♻️",
          },
          revert: {
            description: "撤销之前的提交",
            title: "Reverts",
            emoji: "🗑",
          },
        },
      },
      scope: {
        description: "此次提交的范围 (e.g. 组件 or 文件名)",
      },
      subject: {
        description: "简短说明此次提交的内容",
      },
      body: {
        description: "提供此次提交的详细描述",
      },
      isBreaking: {
        description: "是否有任何破坏性变化",
      },
      breakingBody: {
        description: "如果有破坏性变化提供更详细的提交描述",
      },
      breaking: {
        description: "列出破坏性变化的内容",
      },
      isIssueAffected: {
        description: "此次更改是否影响任何开放的 Issue",
      },
      issuesBody: {
        description:
          "如果 Issue 已关闭，提交需要有正文。请输入提交本身的更详细描述",
      },
      issues: {
        description: '添加 Issue 引用 (e.g. "fix #123", "re #123".)',
      },
    },
  },
  // ...
};

export default Configuration;
