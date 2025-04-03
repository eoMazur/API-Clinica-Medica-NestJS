import { Test, TestingModule } from "@nestjs/testing";
import { UsuarioService } from "./usuario.service";
import { PrismaService } from "../prisma/prisma.service";
import { PrismaClient, Usuario } from "@prisma/client";
import { CreateUsuarioDto } from "./dto/create-usuario.dto";
import { prismaMock } from "../testing/prisma.service.mock";
import { createUserDto } from "../testing/create-usuario-dto.mock";
import { usuarioList } from "../testing/usuario-entity-list.mock";
import { updateDto } from "../testing/update-usuario-dto.mock";

describe('UsuarioService', () => {

    let usuarioService: UsuarioService;
    let prismaService: PrismaService;

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            providers: [UsuarioService, {
                provide: PrismaService,
                useValue: prismaMock
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
            

            prismaService.usuario.create = jest.fn().mockResolvedValue(usuarioList[0]);
            
            const result = await usuarioService.create(createUserDto);

            expect(result).toEqual(usuarioList[0]);
        });

        test('method createPaciente', async () => {
            
            prismaService.usuario.create = jest.fn().mockResolvedValue(usuarioList[2]);

            const result = await usuarioService.createPaciente(createUserDto);

            expect(result).toEqual(usuarioList[2]);
        });

    });

    describe('Read', () => {

        test('method findAll', async () => {

            prismaService.usuario.findMany = jest.fn().mockResolvedValue(usuarioList);
            
            const result = await usuarioService.findAll();

            expect(result).toEqual(usuarioList);
        });

        test('method findOne', async () => {


            prismaService.usuario.count = jest.fn().mockResolvedValue(1);
            prismaService.usuario.findUnique = jest.fn().mockResolvedValue(usuarioList[0]);

            const result = await usuarioService.findOne(1);

            expect(result).toEqual(usuarioList[0]);
        });
    });

    describe('Update', () => {

        test('method Update', async () => {


            prismaService.usuario.count = jest.fn().mockResolvedValue(1);
            prismaService.usuario.update = jest.fn().mockResolvedValue(usuarioList[3]);

            const result = await usuarioService.update(1, updateDto);

            expect(result).toEqual(usuarioList[3]);
        });
    });

});