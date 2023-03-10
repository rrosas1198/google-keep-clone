import { Note, Photo } from "src/features/notes/domain/entities";
import type { IGenericRecord } from "src/interfaces";

export function mapNotesList(response: IGenericRecord[]) {
    if (!Array.isArray(response)) return [];

    return response.map(item => {
        return new Note({
            id: item.id,
            title: item.title,
            content: item.content,
            background: item.background,
            isPinned: item.isPinned ?? false,
            createdAt: new Date(item.createdAt),
            deletedAt: new Date(item.deletedAt),
            photos: _mapPhotos(item.photos)
        });
    });
}

function _mapPhotos(photos: IGenericRecord[]) {
    if (!Array.isArray(photos)) return [];

    return photos.map(item => {
        return new Photo({
            id: item.id,
            url: item.url
        });
    });
}
