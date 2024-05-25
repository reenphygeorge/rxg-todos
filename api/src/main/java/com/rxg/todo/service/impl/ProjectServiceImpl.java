package com.rxg.todo.service.impl;

import com.rxg.todo.dto.CreateProjectDto;
import com.rxg.todo.dto.GetProjectDto;
import com.rxg.todo.dto.UpdateProjectDto;
import com.rxg.todo.dto.ProjectDto;
import com.rxg.todo.entity.Project;
import com.rxg.todo.exception.ResourceNotFoundException;
import com.rxg.todo.mapper.ProjectMapper;
import com.rxg.todo.repository.ProjectRepository;
import com.rxg.todo.service.ProjectService;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;
import java.util.List;
import java.util.UUID;

@Service
@AllArgsConstructor
public class ProjectServiceImpl implements ProjectService {

    private ProjectRepository projectRepository;
    @Override
    public ProjectDto createProject(CreateProjectDto createProjectDto) {
        Project project = ProjectMapper.mapToProject(createProjectDto);
        return ProjectMapper.mapToProjectDto(projectRepository.save(project));
    }

    @Override
    public Project getProjectById(UUID id) {
        return projectRepository.findById(id).orElseThrow(() -> new ResourceNotFoundException("Project Not Found"));
    }

    @Override
    public List<GetProjectDto> listProjects(String email) {
        return ProjectMapper.mapToListProjectDto(projectRepository.findAllByEmail(email));
    }

    @Override
    public UpdateProjectDto updateProject(UpdateProjectDto updateProjectDto) {
        Project project = projectRepository.findById(updateProjectDto.getId()).orElseThrow(()-> new ResourceNotFoundException("Project not found"));
        project.setTitle(updateProjectDto.getTitle());
        return ProjectMapper.mapToUpdateProjectDto(projectRepository.save(project));
    }

    @Override
    public void deleteProject(UUID id) {
            projectRepository.findById(id).orElseThrow(()-> new ResourceNotFoundException("Project not found"));
            projectRepository.deleteById(id);
    }
}
