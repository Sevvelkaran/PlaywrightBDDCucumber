import * as dotenv from 'dotenv';
import { dot } from 'node:test/reporters';
export const getEnv = () => {
    if(process.env.ENV){
        dotenv.config({
            override: true,
            path: `.env.${process.env.ENV}`
        })
    }
}