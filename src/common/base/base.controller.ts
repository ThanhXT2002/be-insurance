/* eslint-disable @typescript-eslint/no-unused-vars */
import { Body, Controller, HttpStatus, Post, Req, HttpCode, Get, UseGuards, UnauthorizedException, Res, Param } from '@nestjs/common';
import { Request, Response } from 'express';

import { Logger } from "@nestjs/common";
import { BaseServiceInterface } from './base.service';
import { common } from 'src/common/constants/constant';



const GUARD = common.admin

export class BaseController<
    T extends {id: bigint}, 
    S extends BaseServiceInterface<T>
> {
    private readonly logger = new Logger(BaseController.name)

    constructor(
       private readonly service: S
    ) {}

   

    


}
