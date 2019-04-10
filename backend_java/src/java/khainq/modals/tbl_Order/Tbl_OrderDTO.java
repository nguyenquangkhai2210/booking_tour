/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package khainq.modals.tbl_Order;

import java.io.Serializable;

/**
 *
 * @author khainguyenquang
 */
public class Tbl_OrderDTO implements Serializable {
    private int id;
    private String createdTime;
    private float total;
    private String status;
    private String lastUpdate;
    private float priceRefund;
    private int idConfig;
    private String userId;

    public Tbl_OrderDTO() {
    }

    public Tbl_OrderDTO(int id, String createdTime, float total, String status, String lastUpdate, float priceRefund, int idConfig, String userId) {
        this.id = id;
        this.createdTime = createdTime;
        this.total = total;
        this.status = status;
        this.lastUpdate = lastUpdate;
        this.priceRefund = priceRefund;
        this.idConfig = idConfig;
        this.userId = userId;
    }

    

    /**
     * @return the id
     */
    public int getId() {
        return id;
    }

    /**
     * @param id the id to set
     */
    public void setId(int id) {
        this.id = id;
    }

    /**
     * @return the createdTime
     */
    public String getCreatedTime() {
        return createdTime;
    }

    /**
     * @param createdTime the createdTime to set
     */
    public void setCreatedTime(String createdTime) {
        this.createdTime = createdTime;
    }

    /**
     * @return the total
     */
    public float getTotal() {
        return total;
    }

    /**
     * @param total the total to set
     */
    public void setTotal(float total) {
        this.total = total;
    }

    /**
     * @return the status
     */
    public String getStatus() {
        return status;
    }

    /**
     * @param status the status to set
     */
    public void setStatus(String status) {
        this.status = status;
    }

    /**
     * @return the lastUpdate
     */
    public String getLastUpdate() {
        return lastUpdate;
    }

    /**
     * @param lastUpdate the lastUpdate to set
     */
    public void setLastUpdate(String lastUpdate) {
        this.lastUpdate = lastUpdate;
    }

    /**
     * @return the priceRefund
     */
    public float getPriceRefund() {
        return priceRefund;
    }

    /**
     * @param priceRefund the priceRefund to set
     */
    public void setPriceRefund(float priceRefund) {
        this.priceRefund = priceRefund;
    }

    /**
     * @return the idConfig
     */
    public int getIdConfig() {
        return idConfig;
    }

    /**
     * @param idConfig the idConfig to set
     */
    public void setIdConfig(int idConfig) {
        this.idConfig = idConfig;
    }

    /**
     * @return the userId
     */
    public String getUserId() {
        return userId;
    }

    /**
     * @param userId the userId to set
     */
    public void setUserId(String userId) {
        this.userId = userId;
    }
    
    
}
