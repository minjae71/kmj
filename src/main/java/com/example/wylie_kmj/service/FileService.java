package com.example.wylie_kmj.service;

import com.example.wylie_kmj.domain.entity.BoardEntity;
import com.example.wylie_kmj.domain.entity.FileEntity;
import com.example.wylie_kmj.domain.repository.FileRepository;
import com.example.wylie_kmj.dto.FileDto;
import com.example.wylie_kmj.util.MD5Generator;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import javax.transaction.Transactional;
import java.io.File;
import java.util.List;
import java.util.Optional;

@Service
public class FileService {
    private FileRepository fileRepository;

    public FileService(FileRepository fileRepository) {
        this.fileRepository = fileRepository;
    }

    @Transactional
    public Long saveFile(FileDto fileDto) {
        return fileRepository.save(fileDto.toEntity()).getId();
    }

    @Transactional
    public FileEntity saveFiles(FileDto fileDto) {
        return fileRepository.save(fileDto.toEntity());
    }

    @Transactional
    public FileDto getFile(Long id) {
        FileEntity fileEntity = fileRepository.findById(id).get();

        FileDto fileDto = FileDto.builder()
                .id(id)
                .originalFilename(fileEntity.getOriginalFilename())
                .filename(fileEntity.getFilename())
                .filePath(fileEntity.getFilePath())
                .fileType(fileEntity.getFileType())
                .fileExtension(fileEntity.getFileExtension())
                .build();
        return fileDto;
    }

    @Transactional
    public List<FileEntity> getBoardFile(Long boardId) {
        List<FileEntity> fileEntity = fileRepository.findByBoardId(boardId);

        return fileEntity;
    }

    @Transactional
    public String extractExt(String originalFilename) {
        int pos = originalFilename.lastIndexOf(".");
        return originalFilename.substring(pos + 1);
    }

    @Transactional
    public String setFileType(String fileExtension) {
        if(fileExtension.equals("jpg") || fileExtension.equals("jpeg") || fileExtension.equals("png") || fileExtension.equals("gif")) {
            return "image";
        } else {
            return "general";
        }
    }
}
