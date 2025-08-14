<p align="center">
  <a href="http://nestjs.com/" target="blank"><img src="https://nestjs.com/img/logo-small.svg" width="120" alt="Nest Logo" /></a>
</p>

[circleci-image]: https://img.shields.io/circleci/build/github/nestjs/nest/master?token=abc123def456
[circleci-url]: https://circleci.com/gh/nestjs/nest

  <p align="center">A progressive <a href="http://nodejs.org" target="_blank">Node.js</a> framework for building efficient and scalable server-side applications.</p>
    <p align="center">
<a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/v/@nestjs/core.svg" alt="NPM Version" /></a>
<a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/l/@nestjs/core.svg" alt="Package License" /></a>
<a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/dm/@nestjs/common.svg" alt="NPM Downloads" /></a>
<a href="https://circleci.com/gh/nestjs/nest" target="_blank"><img src="https://img.shields.io/circleci/build/github/nestjs/nest/master" alt="CircleCI" /></a>
<a href="https://discord.gg/G7Qnnhy" target="_blank"><img src="https://img.shields.io/badge/discord-online-brightgreen.svg" alt="Discord"/></a>
<a href="https://opencollective.com/nest#backer" target="_blank"><img src="https://opencollective.com/nest/backers/badge.svg" alt="Backers on Open Collective" /></a>
<a href="https://opencollective.com/nest#sponsor" target="_blank"><img src="https://opencollective.com/nest/sponsors/badge.svg" alt="Sponsors on Open Collective" /></a>
  <a href="https://paypal.me/kamilmysliwiec" target="_blank"><img src="https://img.shields.io/badge/Donate-PayPal-ff3f59.svg" alt="Donate us"/></a>
    <a href="https://opencollective.com/nest#sponsor"  target="_blank"><img src="https://img.shields.io/badge/Support%20us-Open%20Collective-41B883.svg" alt="Support us"></a>
  <a href="https://twitter.com/nestframework" target="_blank"><img src="https://img.shields.io/twitter/follow/nestframework.svg?style=social&label=Follow" alt="Follow us on Twitter"></a>
</p>
  <!--[![Backers on Open Collective](https://opencollective.com/nest/backers/badge.svg)](https://opencollective.com/nest#backer)
  [![Sponsors on Open Collective](https://opencollective.com/nest/sponsors/badge.svg)](https://opencollective.com/nest#sponsor)-->

## Description

[Nest](https://github.com/nestjs/nest) framework TypeScript starter repository.

## Project setup

```bash
$ npm install
```

## Compile and run the project

```bash
# development
$ npm run start

# watch mode
$ npm run start:dev

# production mode
$ npm run start:prod
```

## Run tests

```bash
# unit tests
$ npm run test

# e2e tests
$ npm run test:e2e

# test coverage
$ npm run test:cov
```

## Deployment

When you're ready to deploy your NestJS application to production, there are some key steps you can take to ensure it runs as efficiently as possible. Check out the [deployment documentation](https://docs.nestjs.com/deployment) for more information.

If you are looking for a cloud-based platform to deploy your NestJS application, check out [Mau](https://mau.nestjs.com), our official platform for deploying NestJS applications on AWS. Mau makes deployment straightforward and fast, requiring just a few simple steps:

```bash
$ npm install -g @nestjs/mau
$ mau deploy
```

With Mau, you can deploy your application in just a few clicks, allowing you to focus on building features rather than managing infrastructure.

## Resources

Check out a few resources that may come in handy when working with NestJS:

- Visit the [NestJS Documentation](https://docs.nestjs.com) to learn more about the framework.
- For questions and support, please visit our [Discord channel](https://discord.gg/G7Qnnhy).
- To dive deeper and get more hands-on experience, check out our official video [courses](https://courses.nestjs.com/).
- Deploy your application to AWS with the help of [NestJS Mau](https://mau.nestjs.com) in just a few clicks.
- Visualize your application graph and interact with the NestJS application in real-time using [NestJS Devtools](https://devtools.nestjs.com).
- Need help with your project (part-time to full-time)? Check out our official [enterprise support](https://enterprise.nestjs.com).
- To stay in the loop and get updates, follow us on [X](https://x.com/nestframework) and [LinkedIn](https://linkedin.com/company/nestjs).
- Looking for a job, or have a job to offer? Check out our official [Jobs board](https://jobs.nestjs.com).

## Support

Nest is an MIT-licensed open source project. It can grow thanks to the sponsors and support by the amazing backers. If you'd like to join them, please [read more here](https://docs.nestjs.com/support).

## Stay in touch

- Author - [Kamil Myśliwiec](https://twitter.com/kammysliwiec)
- Website - [https://nestjs.com](https://nestjs.com/)
- Twitter - [@nestframework](https://twitter.com/nestframework)

## License

Nest is [MIT licensed](https://github.com/nestjs/nest/blob/master/LICENSE).


project-name/
│
├── src/
│   ├── common/                 # Các thành phần dùng chung
│   │   ├── constants/           # Hằng số toàn cục
│   │   ├── decorators/          # Custom decorators (VD: @AuthUser)
│   │   ├── dto/                 # DTO dùng chung
│   │   ├── exceptions/          # Custom exceptions
│   │   ├── filters/              # Exception filters
│   │   ├── guards/               # Auth guards, role guards
│   │   ├── interceptors/         # Logging, Transform, Timeout...
│   │   ├── middlewares/          # Middleware dùng chung
│   │   └── utils/                # Helper functions
│   │
│   ├── config/                  # Config cho env, database, cache...
│   │   ├── app.config.ts
│   │   ├── database.config.ts
│   │   └── redis.config.ts
│   │
│   ├── modules/                 # Chia module theo domain
│   │   ├── auth/
│   │   │   ├── dto/
│   │   │   ├── entities/
│   │   │   ├── auth.controller.ts
│   │   │   ├── auth.service.ts
│   │   │   ├── auth.module.ts
│   │   │   └── strategies/       # JWT, Local, OAuth...
│   │   │
│   │   ├── users/
│   │   │   ├── dto/
│   │   │   ├── entities/
│   │   │   ├── users.controller.ts
│   │   │   ├── users.service.ts
│   │   │   └── users.module.ts
│   │   │
│   │   └── ...                   # Các module khác
│   │
│   ├── database/                # ORM & Migration
│   │   ├── entities/
│   │   ├── migrations/
│   │   └── seeds/
│   │
│   ├── app.module.ts            # Root module
│   ├── main.ts                  # Bootstrap app
│   └── swagger.config.ts        # Swagger setup (nếu dùng)
│
├── test/                        # Unit & E2E tests
│   ├── e2e/
│   └── unit/
│
├── .env                         # Môi trường dev
├── .env.production              # Môi trường production
├── .eslintrc.js                 # ESLint config
├── .prettierrc                  # Prettier config
├── nest-cli.json
├── package.json
├── tsconfig.json
└── README.md


1. Sơ đồ cấu trúc module

┌───────────────────────────────────────┐
│              AppModule                │
│───────────────────────────────────────│
│  - Import các module con               │
│  - Config global (env, pipes, filters) │
└───────────────────────────────────────┘
        ▲                 ▲
        │                 │
 ┌──────┴───────┐   ┌─────┴────────┐
 │  AuthModule  │   │  UsersModule │
 │──────────────│   │──────────────│
 │ AuthController│  │UsersController│
 │ AuthService   │  │UsersService   │
 │ Strategies    │  │Repositories   │
 │ DTOs & Entities│ │DTOs & Entities│
 └───────────────┘   └──────────────┘
        ▲                 ▲
        │                 │
   ┌────┴──────────┐  ┌───┴───────────┐
   │ CommonModule  │  │ DatabaseModule │
   │ (guards,      │  │ (ORM, Models,  │
   │ filters,      │  │ Migrations)    │
   │ interceptors) │  └────────────────┘
   └───────────────┘

2. Luồng Request – Response trong NestJS
[1] Client gửi HTTP Request
       |
       v
[2] Router mapping
    (Dựa trên Controller + Decorator @Get, @Post...)
       |
       v
[3] Guard (nếu có)
    - Ví dụ: AuthGuard, RoleGuard
    - Chặn hoặc cho phép request tiếp tục
       |
       v
[4] Interceptor (Trước khi vào Controller)
    - LoggingInterceptor: log request
    - TransformInterceptor: format response
    - CacheInterceptor: lấy cache nếu có
       |
       v
[5] Controller
    - Nhận request DTO
    - Gọi Service để xử lý nghiệp vụ
       |
       v
[6] Service
    - Xử lý logic nghiệp vụ
    - Gọi Repository/Database hoặc module khác
       |
       v
[7] Repository / ORM / Database
    - Thực hiện query
    - Trả dữ liệu về Service
       |
       v
[8] Service trả kết quả về Controller
       |
       v
[9] Interceptor (Sau khi Controller trả dữ liệu)
    - Biến đổi dữ liệu trả về, log response...
       |
       v
[10] Response gửi lại Client


## sơ đồ sequence UML cho luồng request trong NestJS:
<img src="/public/images/nestjs_request_flow.png"/>