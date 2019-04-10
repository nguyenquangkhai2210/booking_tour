/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package khainq.controller.serviceController.userService.orderSevice;

import com.google.gson.Gson;
import com.google.gson.GsonBuilder;
import java.io.IOException;
import java.io.PrintWriter;
import java.text.SimpleDateFormat;
import java.util.Date;
import javax.servlet.ServletException;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import khainq.controller.ReadBodyRequest;
import khainq.modals.dto.OrderDetail;
import khainq.modals.dto.OrderTourDetail;
import khainq.modals.tbl_Order.Tbl_OrderDAO;
import khainq.modals.tbl_OrderDetail.Tbl_OrderDetailDAO;
import khainq.modals.tbl_Tours.Tbl_ToursDAO;
import khainq.security.TokenAuthencationService;

/**
 *
 * @author khainguyenquang
 */
public class CheckOutOrder extends HttpServlet {

    // <editor-fold defaultstate="collapsed" desc="HttpServlet methods. Click on the + sign on the left to edit the code.">
    /**
     * Handles the HTTP <code>GET</code> method.
     *
     * @param request servlet request
     * @param response servlet response
     * @throws ServletException if a servlet-specific error occurs
     * @throws IOException if an I/O error occurs
     */
    @Override
    protected void doGet(HttpServletRequest request, HttpServletResponse response)
            throws ServletException, IOException {
    }

    /**
     * Handles the HTTP <code>POST</code> method.
     *
     * @param request servlet request
     * @param response servlet response
     * @throws ServletException if a servlet-specific error occurs
     * @throws IOException if an I/O error occurs
     */
    @Override
    protected void doPost(HttpServletRequest request, HttpServletResponse response)
            throws ServletException, IOException {
        response.setContentType("test/json;charset = UTF-8");

        Gson gson = new GsonBuilder().setPrettyPrinting().create();
        ReadBodyRequest bodyRequest = new ReadBodyRequest();

        String jsonBody = bodyRequest.getJsonBody(request);
        
        OrderDetail orderDetail = gson.fromJson(jsonBody, OrderDetail.class);

        TokenAuthencationService authencationService = new TokenAuthencationService();
        String userId = authencationService.getUserFromAuthentication(request);
        String role = authencationService.getRoleFromAuthentication(request);

        try {
            if (role.equals("admin") || role.equals("user")) {
                Tbl_OrderDAO orderDAO = new Tbl_OrderDAO();
                SimpleDateFormat dateFormat = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss.SSS");
                String date = dateFormat.format(new Date());

                boolean check = orderDAO.insertOrder(date, orderDetail.getTotal(), "done", userId, date, 0);

                if (check) {
                    int orderId = orderDAO.getIdOrder(date, userId);

                    orderDetail.getListTour().forEach(data -> insertOrderDetail(data, orderId));

                    response.setStatus(200);
                } else {
                    response.setStatus(400);
                }
            }
        } catch (Exception e) {
            log("ERROR at CheckOutOrder controller: " + e.getMessage());
            response.setStatus(404);
        }
    }

    private void insertOrderDetail(OrderTourDetail tourDetail, int orderId) {
        try {
            Tbl_OrderDetailDAO orderDetailDAO = new Tbl_OrderDetailDAO();
            Tbl_ToursDAO toursDAO = new Tbl_ToursDAO();
            
            toursDAO.updateToursMember(tourDetail.getId(), tourDetail.getQuantity());
            orderDetailDAO.insertOrder(orderId, tourDetail.getId(),
                    tourDetail.getQuantity(), tourDetail.getPrice());
        } catch (Exception e) {
            log("ERROR at CheckOutOrder controller: " + e.getMessage());
        }
    }

    /**
     * Returns a short description of the servlet.
     *
     * @return a String containing servlet description
     */
    @Override
    public String getServletInfo() {
        return "Short description";
    }// </editor-fold>

}
