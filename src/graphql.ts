
/*
 * -------------------------------------------------------
 * THIS FILE WAS AUTOMATICALLY GENERATED (DO NOT MODIFY)
 * -------------------------------------------------------
 */

/* tslint:disable */
/* eslint-disable */

export interface CreateUserInput {
    firstName: string;
    lastName: string;
    email: EmailAddress;
    password: string;
    avatarURL?: Nullable<URL>;
    company: string;
}

export interface UpdateUserInput {
    firstName?: Nullable<string>;
    lastName?: Nullable<string>;
    email?: Nullable<EmailAddress>;
    password?: Nullable<string>;
    avatarURL?: Nullable<URL>;
    company?: Nullable<string>;
}

export interface User {
    id: UUID;
    firstName: string;
    lastName: string;
    fullName?: Nullable<string>;
    email: EmailAddress;
    avatarURL?: Nullable<URL>;
    company?: Nullable<Company>;
    createdAt: DateTime;
}

export interface Company {
    id: UUID;
    name: string;
    users?: Nullable<Nullable<User>[]>;
}

export interface IQuery {
    users(): Nullable<User>[] | Promise<Nullable<User>[]>;
    user(id: UUID): Nullable<User> | Promise<Nullable<User>>;
}

export interface IMutation {
    createUser(createUserInput: CreateUserInput): User | Promise<User>;
    updateUser(id: UUID, updateUserInput: UpdateUserInput): User | Promise<User>;
    removeUser(id: UUID): Nullable<User> | Promise<Nullable<User>>;
}

export type DateTime = Date;
export type EmailAddress = string;
export type UUID = string;
export type URL = string;
export type JWT = string;
type Nullable<T> = T | null;
