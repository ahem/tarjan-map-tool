import { useState, useCallback } from 'react';

function requestFileSystem(): Promise<FileSystem> {
    return new Promise((resolve, reject) => {
        (navigator as any).webkitPersistentStorage.requestQuota(
            1024 * 1024,
            (grantedBytes: number) => {
                console.log(grantedBytes);
                (window.requestFileSystem || window.webkitRequestFileSystem)(
                    window.PERSISTENT,
                    grantedBytes,
                    resolve,
                    reject,
                );
            },
        );
    });
}

function getFile(fs: FileSystem, path: string, options?: Flags) {
    return new Promise<FileEntry>((resolve, reject) =>
        fs.root.getFile(path, options, resolve, reject),
    );
}

function readJsonFile(fileEntry: FileEntry): Promise<object> {
    return new Promise(async (resolve, reject) => {
        const reader = new FileReader();
        reader.onloadend = function() {
            try {
                return resolve(JSON.parse(this.result as any));
            } catch (e) {
                return reject(`error parsing file: ${e.toString()}`);
            }
        };
        reader.onerror = () => reject('error reading file');
        fileEntry.file(file => reader.readAsText(file, 'utf8'));
    });
}

async function writeJsonFile(fileEntry: FileEntry, data: any) {
    return new Promise<void>((resolve, reject) => {
        fileEntry.createWriter(fileWriter => {
            fileWriter.onwriteend = () => resolve();
            fileWriter.onerror = e => reject(`write failed: ${e.toString()}`);
            const blob = new Blob([data], { type: 'application/json' });
            fileWriter.write(blob);
        }, reject);
    });
}

export function useFileSystem() {
    const [file, setFile] = useState<FileEntry>();

    const create = useCallback(
        async (name: string) => {
            setFile(undefined);
            const fs = await requestFileSystem();
            const newFile = await getFile(fs, name, { create: true, exclusive: true });
            setFile(newFile);
        },
        [setFile],
    );

    const open = useCallback(
        async (name: string) => {
            setFile(undefined);
            const fs = await requestFileSystem();
            const file = await getFile(fs, name);
            const data = await readJsonFile(file);
            setFile(file);
            return data;
        },
        [setFile],
    );

    const save = useCallback(
        (data: any) => {
            if (file) {
                return writeJsonFile(file, data);
            } else {
                throw new Error('no current file!');
            }
        },
        [file],
    );

    return [file, { create, open, save }] as const;
}
