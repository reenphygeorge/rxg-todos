package com.rxg.todo.controller;

import com.rxg.todo.dto.*;
import com.rxg.todo.service.ProjectService;
import lombok.AllArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.List;
import java.util.UUID;

@AllArgsConstructor
@RestController
@RequestMapping("/api/projects")
public class ProjectController {
    private ProjectService projectService;

    @GetMapping
    public ResponseEntity<ApiResponseDto<List<GetProjectDto>>> getProjects(@RequestParam String email) {
        List<GetProjectDto> projectList = projectService.listProjects(email);
        ApiResponseDto<List<GetProjectDto>> response = new ApiResponseDto<>(true, "Project fetched", projectList);
        return new ResponseEntity<>(response, HttpStatus.CREATED);
    }

    @PostMapping
    public ResponseEntity<ApiResponseDto<ProjectDto>> createProject(@RequestBody CreateProjectDto createProjectDto) {
        ProjectDto savedProject = projectService.createProject(createProjectDto);
        ApiResponseDto<ProjectDto> response = new ApiResponseDto<>(true, "New project created", savedProject);
        return new ResponseEntity<>(response, HttpStatus.CREATED);
    }

    @PutMapping
    public ResponseEntity<ApiResponseDto<UpdateProjectDto>> updateProject(@RequestBody UpdateProjectDto updateProjectDto) {
        UpdateProjectDto updatedProject = projectService.updateProject(updateProjectDto);
        ApiResponseDto<UpdateProjectDto> response = new ApiResponseDto<>(true, "Project updated", updatedProject);
        return new ResponseEntity<>(response, HttpStatus.CREATED);
    }

    @DeleteMapping
    public ResponseEntity<ApiResponseDto<Void>> deleteProjects(@RequestParam UUID id) {
        projectService.deleteProject(id);
        ApiResponseDto<Void> response = new ApiResponseDto<>(true, "Project deleted", null);
        return new ResponseEntity<>(response, HttpStatus.CREATED);
    }
}
