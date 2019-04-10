package khainq.modals.dto;

import java.io.Serializable;
import java.util.List;
import khainq.modals.tbl_Order.Tbl_OrderDTO;

/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

/**
 *
 * @author khainguyenquang
 */
public class OrderDetail extends Tbl_OrderDTO implements Serializable {
    private List<OrderTourDetail> listTour;

    public OrderDetail() {
    }

    public OrderDetail(List<OrderTourDetail> listTour, Tbl_OrderDTO dto) {
        super(dto.getId(), dto.getCreatedTime(), dto.getTotal(), dto.getStatus(), 
                dto.getLastUpdate(), dto.getPriceRefund(), dto.getIdConfig(), dto.getUserId());
        this.listTour = listTour;
    }

    /**
     * @return the listTour
     */
    public List<OrderTourDetail> getListTour() {
        return listTour;
    }

    /**
     * @param listTour the listTour to set
     */
    public void setListTour(List<OrderTourDetail> listTour) {
        this.listTour = listTour;
    }

    

    
}
