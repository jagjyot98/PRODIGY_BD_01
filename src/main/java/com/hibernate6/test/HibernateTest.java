package com.hibernate6.test;

import com.hibernate6.utility.HibernateUtil;
import org.hibernate.Session;
import org.hibernate.SessionFactory;

public class HibernateTest {
    public static void main(String[] args) {
        SessionFactory sessionFactory = HibernateUtil.getSessionFactory();
        Session session = sessionFactory.openSession();
        String version = (String) session.createNativeQuery("select version()").getSingleResult();
        System.out.println("Mysql version: "+version);
    }
}
