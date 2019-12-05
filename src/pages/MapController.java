package com.example.map.ui;

import com.example.map.dto.InitMapDtoInterface;
import com.example.map.dto.LatLngDto;
import com.example.map.entity.Path;
import com.example.map.repository.PathRepository;
import com.example.map.repository.RowRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RestController;

import java.util.ArrayList;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

import static java.util.stream.Collectors.groupingBy;
import static java.util.stream.Collectors.mapping;

@RestController
public class MapController {

    @Autowired
    PathRepository pathRepository;

    @Autowired
    RowRepository rowRepository;

    @GetMapping("init")
    public ResponseEntity<Map<String, List<LatLngDto>>> initMap() {
        List<InitMapDtoInterface> allRowInformation = rowRepository.getAllRowInformation();
        Map<String, List<LatLngDto>> collect = allRowInformation.stream()
                .collect(groupingBy(InitMapDtoInterface::getInformation,
                        (mapping(this::getLatLngDto, Collectors.toList()))));


        Map<String, List<LatLngDto>> collect1 = allRowInformation.stream()
                .collect(Collectors.toMap(InitMapDtoInterface::getInformation,
                        initMapDtoInterface -> {
                            ArrayList<LatLngDto> objects = new ArrayList<>();
                            LatLngDto latLngDto = new LatLngDto();
                            latLngDto.setLat(initMapDtoInterface.getLat());
                            latLngDto.setLng(initMapDtoInterface.getLng());
                            objects.add(latLngDto);
                            return objects;
                        }, (List<LatLngDto> newValueList, List<LatLngDto> oldValueList) -> {
                            oldValueList.addAll(newValueList);
                            return oldValueList;
                        }));

        return ResponseEntity.ok(collect);
    }

    private LatLngDto getLatLngDto(InitMapDtoInterface initMapDtoInterface) {
        LatLngDto latLngDto = new LatLngDto();
        latLngDto.setLat(initMapDtoInterface.getLat());
        latLngDto.setLng(initMapDtoInterface.getLng());
        return latLngDto;
    }
}
