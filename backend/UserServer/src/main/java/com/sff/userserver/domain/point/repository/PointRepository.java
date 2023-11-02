package com.sff.userserver.domain.point.repository;

import com.sff.userserver.domain.point.entity.Point;
import org.springframework.data.jpa.repository.JpaRepository;

public interface PointRepository extends JpaRepository<Point, Long> {
}
