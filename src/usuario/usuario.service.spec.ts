import { Test, TestingModule } from "@nestjs/testing";
import { UsuarioService } from "./usuario.service";
import { PrismaService } from "../prisma/prisma.service";
import { PrismaClient, Usuario } from "@prisma/client";
import { CreateUsuarioDto } from "./dto/create-usuario.dto";
import { prismaUsuarioMock } from "../testing/usuarios/prisma.usuario-service.mock";
import { createUserDto } from "../testing/create-usuario-dto.mock";
import { usuarioList } from "../testing/usuarios/usuario-entity-list.mock";
import { updateDto } from "../testing/usuarios/update-usuario-dto.mock";
import { NotFoundException } from "@nestjs/common";
import { usuarioResponseList } from "../testing/usuarios/response-usuario-dto.mock";

describe('UsuarioService', () => {

    let usuarioService: UsuarioService;
    let prismaService: PrismaService;

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            providers: [UsuarioService, {
                provide: PrismaService,
                useValue: prismaUsuarioMock
            }]
        }).compile();

        usuarioService = module.get(UsuarioService);
        prismaService = module.get(PrismaService);
    });

    test('Validar a definição', () => {
        expect(usuarioService).toBeDefined();
    });

    describe('Create', () => {

        test('method create with valid data', async () => {
            

            prismaService.usuario.create = jest.fn().mockResolvedValue(usuarioResponseList[0]);
            
            const result = await usuarioService.create(createUserDto);

            expect(result).toEqual(usuarioResponseList[0]);
        });

        test('method createPaciente', async () => {
            
            prismaService.usuario.create = jest.fn().mockResolvedValue(usuarioResponseList[2]);

            const result = await usuarioService.createPaciente(createUserDto);

            expect(result).toEqual(usuarioResponseList[2]);
        });

    });

    describe('Read', () => {

        test('method findAll', async () => {

            prismaService.usuario.findMany = jest.fn().mockResolvedValue(usuarioResponseList);

            const PaginacaoDto = { limit: 10, offset: 0};
            
            const result = await usuarioService.findAll(PaginacaoDto);

            expect(result).toEqual(usuarioResponseList);
        });

        test('method findOne', async () => {


            prismaService.usuario.count = jest.fn().mockResolvedValue(1);
            prismaService.usuario.findUnique = jest.fn().mockResolvedValue(usuarioResponseList[0]);

            const result = await usuarioService.findOne(1);

            expect(result).toEqual(usuarioResponseList[0]);
        });
    });

    describe('Update', () => {

        test('method Update', async () => {


            prismaService.usuario.count = jest.fn().mockResolvedValue(1);
            prismaService.usuario.update = jest.fn().mockResolvedValue(usuarioResponseList[3]);

            const result = await usuarioService.update(1, updateDto);

            expect(result).toEqual(usuarioResponseList[3]);
        });
    });

    describe('Delete', () => {

        test('method delete', async () =>{

            prismaService.usuario.count = jest.fn().mockResolvedValue(1);
            prismaService.usuario.delete = jest.fn().mockResolvedValue(usuarioResponseList[0]);

            const result = await usuarioService.remove(1);

            expect(result).toEqual(usuarioResponseList[0]);
        });
    });

});