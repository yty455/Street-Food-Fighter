package com.sff.OrderServer.bucket.repository;

import com.sff.OrderServer.bucket.entity.OrderMenu;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface OrderMenuRepository extends JpaRepository<OrderMenu, Long> {

}
